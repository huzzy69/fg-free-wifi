import React, { useState, useEffect } from 'react';

interface StatCounterProps {
    end: string | number;
    duration?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    // Parse the numeric part and the suffix (e.g., "50K+" -> 50, "K+")
    const endStr = String(end);
    const numericPart = endStr.match(/\d+/)?.[0] || "0";
    const target = parseInt(numericPart);
    const suffix = endStr.replace(numericPart, "");

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease out cubic for a smoother finish
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOutCubic * target));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [target, duration]);

    return <>{count}{suffix}</>;
};

export default StatCounter;
