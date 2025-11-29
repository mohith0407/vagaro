import { useEffect, useState } from "react";


export interface CountdownReturn {
    h: number;
    m: number;
    s: number;
}


export function useCountdown(targetSeconds: number): CountdownReturn {
    const [time, setTime] = useState(targetSeconds);


    useEffect(() => {
        const timer = setInterval(() => setTime((t) => Math.max(t - 1, 0)), 1000);
        return () => clearInterval(timer);
    }, [targetSeconds]);


    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;


    return { h, m, s };
}