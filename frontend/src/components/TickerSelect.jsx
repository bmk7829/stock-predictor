import React, { useState } from "react";
import { DEFAULT_SYMBOLS } from "../state/store";
import { Search, Clock } from "lucide-react";
import { useMarketStatus } from "../hooks/useMarketStatus";

export default function TickerSelect({ symbol, setSymbol }) {
    const [inputValue, setInputValue] = useState(symbol);
    const isOpen = useMarketStatus();

    const handleSearch = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setSymbol(inputValue.trim().toUpperCase());
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold dark:text-white">Stock Market</h2>
                    {/* FORCE SHOW MARKET CLOSED for showcasing on weekends */}
                    {isOpen ? (
                        <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 tracking-wide uppercase">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            MARKET OPEN
                        </span>
                    ) : (
                        <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/40 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-800 tracking-wide uppercase">
                            <Clock size={12} strokeWidth={3} />
                            MARKET CLOSED
                        </span>
                    )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Search for an asset. NSE Hours: 9:15 AM - 3:30 PM (IST)</p>
            </div>
            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
                <label htmlFor="ticker" className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden md:block">
                    Asset:
                </label>
                <input
                    id="ticker"
                    list="tickers"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="e.g. AAPL, TSLA, RELIANCE.NS"
                    className="flex-1 md:w-64 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 dark:bg-slate-800 dark:border-slate-700 dark:placeholder-slate-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                />
                <datalist id="tickers">
                    {DEFAULT_SYMBOLS.map((s) => (
                        <option key={s} value={s} />
                    ))}
                    <option value="AAPL" />
                    <option value="MSFT" />
                    <option value="TSLA" />
                    <option value="AMZN" />
                    <option value="GOOGL" />
                    <option value="NVDA" />
                    <option value="SBIN" />
                    <option value="TATAMOTORS" />
                    <option value="ZOMATO" />
                </datalist>
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-lg flex items-center justify-center transition-colors shadow-sm"
                    title="Search Symbol"
                >
                    <Search size={18} />
                </button>
            </form>
        </div>
    );
}
