"""
Yahoo Finance data fetcher using yfinance.

Note: yfinance is an unofficial wrapper. "Real-time" quotes are approximations.
We poll every few seconds and return the latest close/last price available.
"""
import yfinance as yf
import pandas as pd

def fetch_history(symbol: str, period: str = "5d", interval: str = "1m") -> pd.DataFrame:
    t = yf.Ticker(symbol)
    df = t.history(period=period, interval=interval, auto_adjust=False)
    df = df.reset_index()
    # Standardize column names
    df.rename(columns={"Datetime": "datetime", "Date": "datetime"}, inplace=True)
    # Ensure expected columns exist
    for col in ["Open", "High", "Low", "Close", "Volume"]:
        if col not in df.columns:
            df[col] = None
    return df

def fetch_latest_price(symbol: str) -> float:
    df = fetch_history(symbol, period="1d", interval="1m")
    if df.empty:
        return float("nan")
    return float(df["Close"].iloc[-1])

def fetch_news(symbol: str):
    try:
        t = yf.Ticker(symbol)
        news = t.news
        if not news:
            return []
        # Return the titles of the top 8 news headlines
        return [item.get("title") for item in news if item.get("title")][:8]
    except Exception as e:
        print(f"Error fetching news for {symbol}: {e}")
        return []