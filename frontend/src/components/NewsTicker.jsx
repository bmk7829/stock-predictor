import React, { useState, useEffect } from "react";
import { getNews } from "../api/client";
import { Newspaper } from "lucide-react";

export default function NewsTicker({ symbol }) {
    const [headlines, setHeadlines] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchNews = async () => {
            try {
                const res = await getNews(symbol);
                if (isMounted && res.data?.headlines) {
                    setHeadlines(res.data.headlines);
                }
            } catch (e) {
                console.error("News fetch failed", e);
            }
        };

        fetchNews();

        // Refresh news every 5 minutes
        const interval = setInterval(fetchNews, 300000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [symbol]);

    if (!headlines || headlines.length === 0) return null;

    // We repeat the headlines array so the continuous scroll seamlessly loops
    const scrollItems = [...headlines, ...headlines];

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex items-center overflow-hidden h-12 w-full relative z-0 relative">

            {/* Left Static Badge */}
            <div className="bg-indigo-600 dark:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider px-4 h-full flex flex-shrink-0 items-center justify-center gap-2 z-10 shadow-md">
                <Newspaper size={16} /> Breaking News
            </div>

            {/* Sliding Marquee Window */}
            <div className="flex-1 overflow-hidden relative h-full flex items-center bg-slate-50 dark:bg-slate-900/50">
                <div className="animate-ticker inline-flex items-center gap-12 whitespace-nowrap absolute pl-8">
                    {scrollItems.map((headline, idx) => (
                        <span key={idx} className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            <span className="text-indigo-500 mr-2 text-lg leading-none">•</span>
                            {headline}
                        </span>
                    ))}
                </div>
            </div>

            {/* Fade Out Edge Gradients */}
            <div className="w-8 h-full absolute right-0 top-0 bottom-0 bg-gradient-to-l from-white dark:from-slate-900 pointer-events-none z-10"></div>
            <div className="w-4 h-full absolute left-[140px] top-0 bottom-0 bg-gradient-to-r from-slate-50 dark:from-slate-900 pointer-events-none z-10"></div>

        </div>
    );
}
