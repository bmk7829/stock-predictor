"""
Model service.
Default: RandomForestRegressor for speed + simplicity.

We also compute an approximate confidence score using ensemble dispersion:
- Lower std across trees => higher confidence.
"""
import os
import joblib
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler

from services.features import add_features, make_supervised

def train_or_load(model_path: str, scaler_path: str, df):
    if os.path.exists(model_path) and os.path.exists(scaler_path):
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        return model, scaler

    df_feat = add_features(df)
    X, y, feature_cols = make_supervised(df_feat, horizon_steps=5)

    scaler = StandardScaler()
    Xs = scaler.fit_transform(X)

    model = RandomForestRegressor(
        n_estimators=250,
        random_state=42,
        n_jobs=-1,
        max_depth=10
    )
    model.fit(Xs, y)

    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    return model, scaler

def predict_next(model, scaler, df_recent, horizon_steps: int = 5):
    """
    Returns:
      predicted_price (float),
      confidence (0..1),
      last_price (float)
    """
    df_feat = add_features(df_recent)
    X, y, feature_cols = make_supervised(df_feat, horizon_steps=horizon_steps)

    if len(X) < 1:
        last_price = float(df_recent["Close"].iloc[-1])
        return last_price, 0.25, last_price

    x_last = X.iloc[[-1]]
    xs_last = scaler.transform(x_last)

    pred = float(model.predict(xs_last)[0])

    # Confidence heuristic via per-tree predictions (only works for RF-like ensembles)
    if hasattr(model, "estimators_"):
        tree_preds = np.array([t.predict(xs_last)[0] for t in model.estimators_], dtype=float)
        std = float(np.std(tree_preds))
        rel_std = std / max(1e-6, abs(pred))
        confidence = float(np.clip(1.0 - rel_std, 0.05, 0.95))
    else:
        confidence = 0.6

    last_price = float(df_recent["Close"].iloc[-1])
    return pred, confidence, last_price

def make_signal(current_price: float, predicted_price: float, confidence: float):
    """
    Buy/Sell/Hold based on predicted return + confidence threshold.
    """
    change = (predicted_price - current_price) / max(1e-9, current_price)
    # thresholds tuned for short horizon
    if confidence >= 0.6 and change > 0.002:
        return "BUY"
    if confidence >= 0.6 and change < -0.002:
        return "SELL"
    return "HOLD"