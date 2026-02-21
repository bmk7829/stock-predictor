# QuantAI - Real-Time Stock Market Prediction & Algorithmic Trading Simulator

QuantAI is a powerful platform that uses AI (Random Forest / LSTM) to give you deep insights into the stock market. With our easy-to-use virtual trading simulator, you can start with a mock balance of ₹1,00,000 to practice algorithmic trading based on real-time simulated AI predictions.

## Features Included:
- **Real-Time Data Streams**: Powered by Yahoo Finance
- **Robust Feature Engineering**: SMA, RSI, MACD, and Volume ratio.
- **Machine Learning Models**: 5-min and 30-min price forecasting with confidence levels.
- **Live Trading Environment**: Execute BUY/SELL orders seamlessly and track portfolio PNL.
- **Analytics & History**: Review past performance, win-rates, trades, and sharpe ratio.
- **Beautiful UI**: Built with React, TailwindCSS, Recharts, and Framer Motion.

## 🚀 Setup Instructions

### Local Development (Without Docker)

**1. Backend Config (Python)**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
python app.py
```
> The backend runs on `http://localhost:5000`

**2. Frontend Config (Node.js)**
```bash
cd frontend
npm install
npm run dev
```
> The frontend runs on `http://localhost:5173`

---

#### Deploying on Render (Free / Cheap Cloud)

**1. Database (State & Models)**
- On your Render Dashboard, you might want to attach a persistent disk to the Backend service pointing to `/app/storage` and `/app/models` to retain your simulated portfolio and AI cache.

**2. Web Service (Backend)**
- `New +` -> `Web Service` -> Select Repo.
- Environment: Python
- Build Command: `pip install -r requirements.txt`
- Start Command: `gunicorn app:app -b 0.0.0.0:$PORT`
- Set `FLASK_ENV=production`.

**3. Static Site (Frontend)**
- `New +` -> `Static Site` -> Select Repo.
- Base Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Add an environment variable: `VITE_API_URL` leading to the Render Backend URL.

---
**Enjoy practicing Day Trading with QuantAI without risking single penny!**
