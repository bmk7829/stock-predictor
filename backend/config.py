import os

class Config:
    # Trading simulator defaults
    STARTING_BALANCE_INR = float(os.getenv("STARTING_BALANCE_INR", "100000"))
    TRANSACTION_FEE_RATE = float(os.getenv("TRANSACTION_FEE_RATE", "0.001"))  # 0.10%
    STORAGE_PATH = os.getenv("STORAGE_PATH", "storage/trades.json")

    # Market data
    DEFAULT_SYMBOL = os.getenv("DEFAULT_SYMBOL", "RELIANCE.NS")
    POLL_SECONDS = int(os.getenv("POLL_SECONDS", "5"))

    # Model
    MODEL_TYPE = os.getenv("MODEL_TYPE", "rf")  # "rf" (fast) or "lstm" (optional extension)
    MODEL_PATH = os.getenv("MODEL_PATH", "models/model.pkl")
    SCALER_PATH = os.getenv("SCALER_PATH", "models/scaler.pkl")