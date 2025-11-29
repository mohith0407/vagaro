import { useCountdown } from "../hooks/useCountdown";


export interface CountdownProps {
    seconds: number;
}


export function Countdown({ seconds }: CountdownProps) {
    const { h, m, s } = useCountdown(seconds);


    return (
        <div className="flex gap-2 text-white font-semibold text-lg">
            <span>{String(h).padStart(2, "0")}</span>:
            <span>{String(m).padStart(2, "0")}</span>:
            <span>{String(s).padStart(2, "0")}</span>
        </div>
    );
}