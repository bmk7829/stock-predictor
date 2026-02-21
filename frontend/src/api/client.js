import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL,
  timeout: 20000,
});

export const getStream = (symbol) => api.get(`/stream`, { params: { symbol } });
export const getPredict = (symbol) => api.get(`/predict`, { params: { symbol } });
export const getPortfolio = (symbol) => api.get(`/portfolio`, { params: { symbol } });
export const executeTrade = (symbol, side, qty) => api.post(`/trade`, { symbol, side, qty });
export const getSentiment = (headlines) => api.post(`/sentiment`, { headlines });
export const getNews = (symbol) => api.get(`/news`, { params: { symbol } });