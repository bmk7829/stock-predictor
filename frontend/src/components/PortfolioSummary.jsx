import React from 'react';
import { DollarSign, Briefcase, TrendingUp, Activity } from 'lucide-react';

export default function PortfolioSummary({ data }) {
    if (!data) return <div className="animate-pulse p-6 bg-slate-100 dark:bg-slate-800 rounded-xl h-40"></div>;

    const { cash, positions_value, total_value, pnl, starting_balance } = data;
    const isProfit = pnl >= 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatBox title="Total Value" value={`₹${total_value.toFixed(2)}`} icon={DollarSign} color="indigo" />
            <StatBox title="Starting Balance" value={`₹${starting_balance.toFixed(2)}`} icon={Briefcase} color="slate" />
            <StatBox title="Cash Available" value={`₹${cash.toFixed(2)}`} icon={Activity} color="emerald" />

            <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between ${isProfit ? 'border-b-4 border-b-emerald-500' : 'border-b-4 border-b-rose-500'}`}>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm">Total Profit / Loss</h3>
                    <span className={`p-2 rounded-lg ${isProfit ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400'}`}>
                        <TrendingUp size={20} className={!isProfit ? 'rotate-180 transform' : ''} />
                    </span>
                </div>
                <div>
                    <span className={`text-2xl font-bold ${isProfit ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {isProfit ? '+' : ''}₹{pnl.toFixed(2)}
                    </span>
                    <div className="text-xs text-slate-400 mt-1 mt-auto">
                        {((pnl / starting_balance) * 100).toFixed(2)}% Return
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatBox({ title, value, icon: Icon, color }) {
    const colorMap = {
        indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
        slate: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
        emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm">{title}</h3>
                <span className={`p-2 rounded-lg ${colorMap[color]}`}>
                    <Icon size={20} />
                </span>
            </div>
            <div>
                <span className="text-2xl font-bold dark:text-white">{value}</span>
            </div>
        </div>
    );
}
