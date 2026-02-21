import React, { useState, useEffect } from 'react';
import { getPortfolio } from '../api/client';
import { DEFAULT_SYMBOLS } from '../state/store';
import TickerSelect from '../components/TickerSelect';
import PortfolioSummary from '../components/PortfolioSummary';
import TradeHistory from '../components/TradeHistory';

export default function Portfolio() {
    const [symbol, setSymbol] = useState(DEFAULT_SYMBOLS[0]);
    const [data, setData] = useState(null);

    useEffect(() => {
        let timeout;
        let isMounted = true;

        const fetchPortfolio = async () => {
            try {
                const res = await getPortfolio(symbol);
                if (isMounted) setData(res.data);
            } catch (e) {
                console.error("Portfolio failed", e);
            }
            if (isMounted) timeout = setTimeout(fetchPortfolio, 5000);
        };

        setData(null);
        fetchPortfolio();

        return () => {
            isMounted = false;
            clearTimeout(timeout);
        };
    }, [symbol]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <TickerSelect symbol={symbol} setSymbol={setSymbol} />

            <div className="animate-in slide-in-from-bottom-4 duration-700">
                <PortfolioSummary data={data} />
            </div>

            <div className="animate-in slide-in-from-bottom-8 duration-1000">
                <TradeHistory trades={data?.trades || []} />
            </div>
        </div>
    );
}
