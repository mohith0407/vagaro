import React from "react";


export interface CardProps {
    children: React.ReactNode;
    className?: string;
}


export function Card({ children, className }: CardProps) {
    return <div className={`bg-dark-card rounded-2xl p-4 shadow-card ${className}`}>{children}</div>;
}