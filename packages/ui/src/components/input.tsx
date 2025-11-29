import React from "react";
import { IconType } from "react-icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: IconType;
  error?: string;
}

export const Input = ({ label, icon: Icon, error, className = "", ...props }: InputProps) => {
  return (
    <div className="w-full space-y-2 text-red-400">
      {label && (
        <label className="text-xs font-bold text-gray-text uppercase tracking-wider ml-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text group-focus-within:text-primary transition-colors">
            <Icon size={20} />
          </div>
        )}
        
        <input
          className={`
            w-full bg-dark-card border-2 border-dark-light rounded-xl px-4 py-3.5
            text-text-main placeholder:text-gray-text/50 outline-none transition-all
            focus:border-primary focus:shadow-[0_0_0_4px_rgba(12,230,138,0.1)]
            ${Icon ? "pl-12" : ""}
            ${error ? "border-danger focus:border-danger" : ""}
            ${className}
          `}
          {...props}
        />
      </div>

      {error && <p className="text-xs text-danger font-medium ml-1">{error}</p>}
    </div>
  );
};