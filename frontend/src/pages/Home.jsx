import React, { useState, useEffect } from 'react';
import { getStream, getPredict } from '../api/client';
import { DEFAULT_SYMBOLS } from '../state/store';
import TickerSelect from '../components/TickerSelect';
import PriceCard from '../components/PriceCard';
import PredictionCard from '../components/PredictionCard';
import TradePanel from '../components/TradePanel';
import ChartPanel from '../components/ChartPanel';
import NewsTicker from '../components/NewsTicker';

export default function Home() {
    const [symbol, setSymbol] = useState(DEFAULT_SYMBOLS[0]);
    const [streamData, setStreamData] = useState([]);
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        let timeoutStream;
        let timeoutPredict;
        let isMounted = true;

        const fetchStream = async () => {
            try {
                const res = await getStream(symbol);
                if (isMounted) setStreamData(res.data.points);
                if (isMounted) timeoutStream = setTimeout(fetchStream, (res.data.poll_seconds || 5) * 1000);
            } catch (e) {
                console.error("Stream failed", e);
                if (isMounted) timeoutStream = setTimeout(fetchStream, 5000);
            }
        };

        const fetchPredict = async () => {
            try {
                const res = await getPredict(symbol);
                if (isMounted) setPrediction(res.data);
            } catch (e) {
                console.error("Predict failed", e);
            }
            if (isMounted) timeoutPredict = setTimeout(fetchPredict, 60000);
        };

        setStreamData([]);
        setPrediction(null);
        fetchStream();
        fetchPredict();

        return () => {
            isMounted = false;
            clearTimeout(timeoutStream);
            clearTimeout(timeoutPredict);
        };
    }, [symbol]);

    const currentPrice = streamData.length > 0 ? streamData[streamData.length - 1].close : null;
    const previousPrice = streamData.length > 1 ? streamData[streamData.length - 2].close : null;
    const lastDate = streamData.length > 0 ? streamData[streamData.length - 1].t : null;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <TickerSelect symbol={symbol} setSymbol={setSymbol} />
            <NewsTicker symbol={symbol} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-700">
                <PriceCard currentPrice={currentPrice} previousPrice={previousPrice} lastDate={lastDate} symbol={symbol} />
                <PredictionCard prediction={prediction} />
                <TradePanel symbol={symbol} currentPrice={currentPrice} prediction={prediction} onTradeSuccess={() => console.log('Trade success!')} />
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm animate-in slide-in-from-bottom-8 duration-1000">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold dark:text-white">Live Performance Chart</h2>
                    <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">{symbol} - 1m</span>
                </div>
                <ChartPanel data={streamData} symbol={symbol} />
            </div>
        </div>
    );
}
