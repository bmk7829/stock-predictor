import React from 'react';
import { Cpu, LineChart, Globe, Lock } from 'lucide-react';

export default function About() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
                <h1 className="text-3xl font-bold dark:text-white mb-4">About QuantAI</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                    QuantAI is an advanced Real-Time Stock Market Prediction & Algorithmic Trading Simulator.
                    It uses cutting-edge Machine Learning models to analyze historical data, calculate technical indicators
                    like Moving Averages, RSI, and MACD, and generate highly accurate short-term price predictions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <FeatureCard
                        icon={Cpu}
                        title="AI-Powered Predictions"
                        desc="Our LSTM/Random Forest models process thousands of data points to predict stock movements 5 and 30 minutes into the future."
                    />
                    <FeatureCard
                        icon={LineChart}
                        title="Real-Time Simulator"
                        desc="Practice your trading strategies with a ₹100,000 virtual balance in a true-to-life market simulation with actual transaction fees."
                    />
                    <FeatureCard
                        icon={Globe}
                        title="Live Market Data"
                        desc="Streaming data directly from Yahoo Finance ensures you're always looking at real-time market conditions."
                    />
                    <FeatureCard
                        icon={Lock}
                        title="Risk-Free Environment"
                        desc="Learn day trading and algorithmic strategies without risking actual capital. Perfect for beginners and quants alike."
                    />
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, desc }) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Icon size={24} />
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold dark:text-white mb-2">{title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
