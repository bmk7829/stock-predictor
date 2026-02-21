import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import ClockBadge from "./ClockBadge";
import { toggleTheme } from "../state/store.js";

export default function Navbar() {
  const [theme, setTheme] = useState(document.documentElement.classList.contains("dark") ? "dark" : "light");

  return (
    <div className="sticky top-0 z-10 border-b border-slate-200/60 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-sm">
            <TrendingUp size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-semibold leading-4">Stock Predictor</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">AI Powered Trading Simulator</div>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <ClockBadge />
          <div className="flex items-center gap-2">
            {[
              ["Home", "/"],
              ["Portfolio", "/portfolio"],
              ["Analytics", "/analytics"],
              ["About", "/about"],
            ].map(([title, url]) => (
              <NavLink
                key={title}
                to={url}
                className={({ isActive }) =>
                  `px-3 py-1 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`
                }
              >
                {title}
              </NavLink>
            ))}
            <button
              onClick={() => {
                toggleTheme();
                setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
              }}
              className="ml-2 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
