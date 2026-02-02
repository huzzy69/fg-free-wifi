import React, { useState, useEffect, useRef } from 'react';

interface StatCounterProps {
    end: string | number;
    duration?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [decimalCount, setDecimalCount] = useState("0");
    const [isVisible, setIsVisible] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    const endStr = String(end);
    const numericPart = endStr.match(/[\d.]+/)?.[0] || "0";
    const target = parseFloat(numericPart);
    const suffix = endStr.replace(numericPart, "");

    const showDecimals = target < 10 && target > 0;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), 150);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);

            if (showDecimals) {
                setDecimalCount((easeOutCubic * target).toFixed(1));
            } else {
                setCount(Math.floor(easeOutCubic * target));
            }

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setIsFinished(true);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, target, duration, showDecimals]);

    return (
        <span ref={elementRef} style={{ display: 'inline-block', minWidth: '1ch' }}>
            {isFinished ? endStr : (
                <>
                    {showDecimals ? decimalCount : count}
                    {suffix}
                </>
            )}
        </span>
    );
};

export default StatCounter;
