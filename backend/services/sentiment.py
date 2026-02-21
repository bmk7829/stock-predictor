"""
Simple news sentiment placeholder.

For a real system:
- pull RSS/news API (e.g., NewsAPI, Alpha Vantage news, Finnhub)
- run FinBERT or similar
Here we provide a stub endpoint + lightweight TextBlob scoring.
"""
from textblob import TextBlob

def score_headlines(headlines):
    if not headlines:
        return {"sentiment": 0.0, "label": "neutral"}
    text = " ".join(headlines)
    pol = float(TextBlob(text).sentiment.polarity)  # -1..1
    label = "positive" if pol > 0.1 else "negative" if pol < -0.1 else "neutral"
    return {"sentiment": pol, "label": label}