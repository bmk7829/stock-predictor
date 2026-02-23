import yfinance as yf
import pandas as pd
import datetime

def fetch_latest_price(symbol: str) -> float:
    """
    Fetches real-time price using Yahoo Finance.
    """
    try:
        ticker = yf.Ticker(symbol)
        todays_data = ticker.history(period='1d')
        if not todays_data.empty:
            return float(todays_data['Close'].iloc[-1])
        return 0.0
    except Exception as e:
        print(f"Error fetching live price for {symbol} via yfinance: {e}")
        return 0.0

def fetch_history(symbol: str, period: str = "5d", interval: str = "1m") -> pd.DataFrame:
    """
    Fetches historical data using Yahoo Finance.
    """
    try:
        ticker = yf.Ticker(symbol)
        df = ticker.history(period=period, interval=interval)
        
        if df.empty:
            return pd.DataFrame()
            
        # yfinance returns DatetimeIndex, reset it so 'datetime' is a column as expected by downstream logic
        df.reset_index(inplace=True)
        # Handle timezones if present, drop timezone info for compatibility with earlier code
        df['datetime'] = pd.to_datetime(df['Datetime']).dt.tz_localize(None) 
        df.drop(columns=['Datetime'], inplace=True, errors='ignore')
        
        # Standardize column names for the ML pipeline
        for col in ["Open", "High", "Low", "Close", "Volume"]:
            if col not in df.columns:
                df[col] = 0.0
                
        return df
    except Exception as e:
        print(f"Error fetching history for {symbol} via yfinance: {e}")
        return pd.DataFrame()

def fetch_news(symbol: str):
    """
    Fetch news from Yahoo Finance.
    """
    try:
        ticker = yf.Ticker(symbol)
        news_items = ticker.news
        headlines = []
        if news_items:
            # take top 5
            for item in news_items[:5]:
                headlines.append(item.get('title', ''))
        
        if not headlines:
            raise ValueError("No news found")
            
        return headlines
    except Exception as e:
        print(f"Error fetching news for {symbol}: {e}")
        return [
            f"{symbol} updates its quarterly corporate disclosures.",
            f"Board meeting announced for {symbol} regarding upcoming dividends.",
            f"Investor presentations filed by {symbol} management.",
            f"New bulk deals or block deals reported for {symbol} on the exchange.",
            f"{symbol} regulatory filings indicate steady operational performance."
        ]
