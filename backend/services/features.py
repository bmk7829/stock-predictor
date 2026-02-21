"""
Feature engineering:
- Moving averages
- RSI
- MACD
- Volume related features

Uses `ta` library.
"""
import pandas as pd
import numpy as np
from ta.trend import MACD, SMAIndicator
from ta.momentum import RSIIndicator

def add_features(df: pd.DataFrame) -> pd.DataFrame:
    out = df.copy()
    out = out.sort_values("datetime").reset_index(drop=True)

    close = out["Close"].astype(float)
    volume = out["Volume"].astype(float)

    out["sma_5"] = SMAIndicator(close, window=5).sma_indicator()
    out["sma_15"] = SMAIndicator(close, window=15).sma_indicator()
    out["rsi_14"] = RSIIndicator(close, window=14).rsi()

    macd = MACD(close=close, window_slow=26, window_fast=12, window_sign=9)
    out["macd"] = macd.macd()
    out["macd_signal"] = macd.macd_signal()
    out["macd_diff"] = macd.macd_diff()

    out["vol_sma_15"] = volume.rolling(15).mean()
    out["vol_ratio"] = np.where(out["vol_sma_15"] > 0, volume / out["vol_sma_15"], 1.0)

    # Simple returns
    out["ret_1"] = close.pct_change(1)
    out["ret_5"] = close.pct_change(5)

    return out

def make_supervised(df_feat: pd.DataFrame, horizon_steps: int = 5):
    """
    Predict close price horizon_steps into the future.
    Returns X, y with NaNs removed.
    """
    df = df_feat.copy()
    df["y"] = df["Close"].shift(-horizon_steps)
    feature_cols = [
        "Close", "Volume",
        "sma_5", "sma_15",
        "rsi_14",
        "macd", "macd_signal", "macd_diff",
        "vol_ratio",
        "ret_1", "ret_5",
    ]
    df = df.dropna(subset=feature_cols + ["y"]).reset_index(drop=True)
    X = df[feature_cols].astype(float)
    y = df["y"].astype(float)
    return X, y, feature_cols