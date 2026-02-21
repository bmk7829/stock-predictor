import React from 'react';
import { Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useMarketStatus } from '../hooks/useMarketStatus';

export default function PredictionCard({ prediction }) {
    const isOpen = useMarketStatus();

    if (!isOpen) {
        return (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center h-full text-center">
                <Clock className="text-slate-400 dark:text-slate-500 mb-3" size={32} />
                <h3 className="text-slate-700 dark:text-slate-300 font-bold mb-1">Market Closed</h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">AI predictions are paused until the next active trading session.</span>
            </div>
        );
    }

    if (!prediction) {
        return (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center h-full">
                <Activity className="animate-pulse text-slate-400 mb-2" size={32} />
                <span className="text-slate-500 dark:text-slate-400">Loading AI Prediction...</span>
            </div>
        );
    }

    const {
        predicted_price_5m,
        confidence_5m,
        predicted_price_30m,
        confidence_30m,
        signal
    } = prediction;

    const getSignalColor = () => {
        if (signal === 'BUY') return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
        if (signal === 'SELL') return 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800';
        return 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    };

    const Icon = signal === 'BUY' ? CheckCircle : signal === 'SELL' ? AlertTriangle : Activity;

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 dark:text-slate-400 font-medium">AI Forecast</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getSignalColor()}`}>
                    <Icon size={14} />
                    {signal}
                </span>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-end border-b pb-3 dark:border-slate-800">
                    <div className="flex flex-col">
                        <span className="text-sm dark:text-slate-400 mb-1">5 Minute Target</span>
                        <span className="text-2xl font-bold dark:text-white">
                            ₹{(predicted_price_5m || 0).toFixed(2)}
                        </span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-slate-400 mb-1">Confidence</span>
                        <span className={`text-sm font-bold ${(confidence_5m || 0) > 0.7 ? "text-emerald-500" : "text-amber-500"}`}>
                            {((confidence_5m || 0) * 100).toFixed(0)}%
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-end pb-1">
                    <div className="flex flex-col">
                        <span className="text-sm dark:text-slate-400 mb-1">30 Minute Target</span>
                        <span className="text-xl font-bold dark:text-white">
                            ₹{(predicted_price_30m || 0).toFixed(2)}
                        </span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-slate-400 mb-1">Confidence</span>
                        <span className={`text-sm font-bold ${(confidence_30m || 0) > 0.7 ? "text-emerald-500" : "text-amber-500"}`}>
                            {((confidence_30m || 0) * 100).toFixed(0)}%
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-xs text-slate-400 mt-4 text-center">
                Powered by AI Model Analysis
            </div>
        </div>
    );
}
