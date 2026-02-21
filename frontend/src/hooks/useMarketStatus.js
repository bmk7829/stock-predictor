import { useState, useEffect } from 'react';

export function useMarketStatus() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkMarketStatus = () => {
            const options = { timeZone: 'Asia/Kolkata', hour12: false, weekday: 'short', hour: 'numeric', minute: 'numeric' };
            const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(new Date());

            let weekday = '', hour = 0, minute = 0;
            for (const part of parts) {
                if (part.type === 'weekday') weekday = part.value;
                if (part.type === 'hour') hour = parseInt(part.value, 10);
                if (part.type === 'minute') minute = parseInt(part.value, 10);
            }

            if (weekday === 'Sat' || weekday === 'Sun') {
                setIsOpen(false);
                return;
            }

            // Fix strange modulo 24 behaviour in formatting sometimes
            if (hour === 24) hour = 0;

            const currentMins = hour * 60 + minute;
            // Market opens precisely at 9:15 AM (555 mins) and closes at 3:30 PM (930 mins)
            setIsOpen(currentMins >= 555 && currentMins < 930);
        };

        checkMarketStatus();
        const intervalId = setInterval(checkMarketStatus, 60000); // Check every minute
        return () => clearInterval(intervalId);
    }, []);

    return isOpen;
}
