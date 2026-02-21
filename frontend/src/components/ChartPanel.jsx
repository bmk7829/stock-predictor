import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export default function ChartPanel({ data, symbol }) {
    if (!data || data.length === 0) {
        return (
            <div className="h-[400px] flex items-center justify-center text-slate-500 dark:text-slate-400">
                Waiting for stream...
            </div>
        );
    }

    const formatTime = (ts) => {
        const d = new Date(ts);
        return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
    };

    const currentPrice = data[data.length - 1].close;
    const initPrice = data[0].close;
    const isUp = currentPrice >= initPrice;
    const strokeColor = isUp ? "#10b981" : "#f43f5e";
    const fillColor = isUp ? "#d1fae5" : "#ffe4e6";
    const fillDarkColor = isUp ? "#064e3b" : "#4c0519";

    // Choose theme based colors
    const isDark = document.documentElement.classList.contains("dark");
    const fill = isDark ? fillDarkColor : fillColor;

    const min = Math.min(...data.map(d => d.close));
    const max = Math.max(...data.map(d => d.close));
    const buffer = (max - min) * 0.1;

    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="t"
                        tickFormatter={formatTime}
                        minTickGap={30}
                        axisLine={false}
                        tickLine={false}
                        stroke="#94a3b8"
                        fontSize={12}
                    />
                    <YAxis
                        domain={[min - buffer, max + buffer]}
                        axisLine={false}
                        tickLine={false}
                        tickCount={5}
                        stroke="#94a3b8"
                        fontSize={12}
                        tickFormatter={(value) => value.toFixed(1)}
                        orientation="right"
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? '#0f172a' : '#ffffff',
                            borderColor: isDark ? '#1e293b' : '#e2e8f0',
                            borderRadius: '0.5rem',
                            color: isDark ? '#f8fafc' : '#0f172a'
                        }}
                        labelFormatter={formatTime}
                        formatter={(val) => [`₹${val.toFixed(2)}`, 'Price']}
                    />
                    <Area
                        type="monotone"
                        dataKey="close"
                        stroke={strokeColor}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorClose)"
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
