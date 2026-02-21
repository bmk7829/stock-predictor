import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Analytics() {
    const data = [
        { name: 'Day 1', pnl: 0 },
        { name: 'Day 2', pnl: 120 },
        { name: 'Day 3', pnl: -50 },
        { name: 'Day 4', pnl: 300 },
        { name: 'Day 5', pnl: 450 },
        { name: 'Day 6', pnl: 400 },
        { name: 'Day 7', pnl: 850 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold dark:text-white mb-6">Performance Analytics</h2>
                <div className="h-80 w-full mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                            <Tooltip
                                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(val) => [`₹${val}`, 'PnL']}
                            />
                            <Area type="monotone" dataKey="pnl" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorPnl)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                        <h4 className="text-slate-500 dark:text-slate-400 text-sm mb-1">Win Rate</h4>
                        <span className="text-xl font-bold dark:text-white text-emerald-500">68%</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                        <h4 className="text-slate-500 dark:text-slate-400 text-sm mb-1">Sharpe Ratio</h4>
                        <span className="text-xl font-bold dark:text-white text-indigo-500">1.8</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                        <h4 className="text-slate-500 dark:text-slate-400 text-sm mb-1">Max Drawdown</h4>
                        <span className="text-xl font-bold dark:text-white text-rose-500">-2.4%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
