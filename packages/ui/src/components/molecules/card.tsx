import React from "react";

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`bg-bg-panel border border-border rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  );
};