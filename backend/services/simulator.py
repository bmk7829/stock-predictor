"""
Virtual trading simulator:
- Maintains cash + positions
- Applies transaction fee
- Stores trade history in JSON
"""
import json
import os
from dataclasses import dataclass, asdict
from typing import Dict, Any, List

from utils.timeutil import now_iso

@dataclass
class Trade:
    ts: str
    symbol: str
    side: str  # BUY/SELL
    qty: float
    price: float
    fee: float

def _load_state(path: str) -> Dict[str, Any]:
    if not os.path.exists(path):
        return {"cash": None, "positions": {}, "trades": []}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def _save_state(path: str, state: Dict[str, Any]):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2)

def init_if_needed(path: str, starting_cash: float):
    state = _load_state(path)
    if state.get("cash") is None:
        state["cash"] = float(starting_cash)
        state["positions"] = {}
        state["trades"] = []
        _save_state(path, state)

def portfolio_snapshot(path: str, prices: Dict[str, float]) -> Dict[str, Any]:
    state = _load_state(path)
    cash = float(state.get("cash", 0.0))
    positions = state.get("positions", {})
    value_positions = 0.0
    pos_detail = {}
    for sym, qty in positions.items():
        p = float(prices.get(sym, 0.0))
        qtyf = float(qty)
        v = qtyf * p
        value_positions += v
        pos_detail[sym] = {"qty": qtyf, "price": p, "value": v}
    total = cash + value_positions
    return {
        "cash": cash,
        "positions": pos_detail,
        "positions_value": value_positions,
        "total_value": total,
        "trades": state.get("trades", []),
    }

def execute_trade(path: str, symbol: str, side: str, qty: float, price: float, fee_rate: float):
    state = _load_state(path)
    cash = float(state.get("cash", 0.0))
    positions = state.get("positions", {})
    qty = float(qty)
    price = float(price)

    notional = qty * price
    fee = notional * float(fee_rate)

    if side == "BUY":
        cost = notional + fee
        if cost > cash:
            raise ValueError("Insufficient cash for BUY")
        cash -= cost
        positions[symbol] = float(positions.get(symbol, 0.0)) + qty
    elif side == "SELL":
        held = float(positions.get(symbol, 0.0))
        if qty > held:
            raise ValueError("Insufficient position for SELL")
        proceeds = notional - fee
        cash += proceeds
        positions[symbol] = held - qty
        if positions[symbol] <= 1e-9:
            positions.pop(symbol, None)
    else:
        raise ValueError("side must be BUY or SELL")

    state["cash"] = cash
    state["positions"] = positions

    t = Trade(ts=now_iso(), symbol=symbol, side=side, qty=qty, price=price, fee=fee)
    state.setdefault("trades", []).append(asdict(t))
    _save_state(path, state)
    return t