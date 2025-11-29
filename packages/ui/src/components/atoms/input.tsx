import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = ({ label, error, leftIcon, className = "", ...props }: InputProps) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{label}</label>}
      
      <div className="relative group">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary-400 transition-colors">
            {leftIcon}
          </div>
        )}
        <input
          className={`
            w-full bg-bg-panel border border-border rounded-xl px-4 py-3 
            text-text-primary placeholder:text-text-secondary/50 outline-none transition-all
            focus:border-primary-500 focus:ring-1 focus:ring-primary-500
            ${leftIcon ? "pl-10" : ""}
            ${error ? "border-danger focus:border-danger focus:ring-danger" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && <p className="text-xs text-danger font-medium">{error}</p>}
    </div>
  );
};