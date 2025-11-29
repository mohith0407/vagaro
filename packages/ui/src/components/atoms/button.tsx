import * as React from "react";
import { IconType } from "react-icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "neon" | "glass" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: IconType;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export function Button({ 
  children, 
  variant = "neon", 
  size = "md", 
  icon: Icon,
  fullWidth = false,
  isLoading = false,
  className = "", 
  disabled,
  ...props 
}: ButtonProps) {
  
  const base = "relative overflow-hidden rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    neon: "btn-neon",
    glass: "glass-panel hover:bg-white/10 text-white",
    outline: "border border-neon-500 text-neon-400 hover:bg-neon-500/10",
    ghost: "text-text-secondary hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button 
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
      ) : (
        <>
          {Icon && <Icon size={18} />}
          {children}
        </>
      )}
    </button>
  );
}