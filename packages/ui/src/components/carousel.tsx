import React from "react";


export interface CarouselProps {
    children: React.ReactNode;
    className?: string;
}


export function Carousel({ children, className }: CarouselProps) {
    return <div className={`flex overflow-x-auto no-scrollbar gap-4 py-2 ${className}`}>{children}</div>;
}