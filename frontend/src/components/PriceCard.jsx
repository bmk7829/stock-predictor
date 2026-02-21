import React from "react";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { useMarketStatus } from "../hooks/useMarketStatus";

export default function PriceCard({ currentPrice, previousPrice, lastDate, symbol }) {
    const diff = currentPrice && previousPrice ? currentPrice - previousPrice : 0;
    const pct = previousPrice && previousPrice > 0 ? (diff / previousPrice) * 100 : 0;

    const isUp = diff >= 0;
    const isOpen = useMarketStatus();

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 dark:text-slate-400 font-medium">
                    {isOpen ? "Current Price" : "Last Day Closing Price"}
                    {!isOpen && lastDate && (
                        <span className="text-xs font-normal text-slate-400 ml-2">
                            ({new Date(lastDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })})
                        </span>
                    )}
                </h3>
                <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
                    <DollarSign size={20} />
                </span>
            </div>
            <div className="flex flex-col">
                <span className="text-3xl font-bold dark:text-white mb-2">
                    ₹{currentPrice ? currentPrice.toFixed(2) : "---"}
                </span>
                <div className={`flex items-center gap-1 font-medium ${isUp ? "text-emerald-500" : "text-rose-500"}`}>
                    {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>{Math.abs(diff).toFixed(2)}</span>
                    <span>({Math.abs(pct).toFixed(2)}%)</span>
                </div>
                <span className="text-xs text-slate-400 mt-2">
                    {symbol} {isOpen ? "Real-time Data" : "End-of-day Data"}
                </span>
            </div>
        </div>
    );
}
