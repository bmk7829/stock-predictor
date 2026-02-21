import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function ClockBadge() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const dateStr = time.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const timeStr = time.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return (
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
            <Clock size={16} className="text-indigo-500 dark:text-indigo-400" />
            <span>{dateStr}</span>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <span className="font-mono w-[90px] text-right tracking-tight">{timeStr}</span>
        </div>
    );
}
