"use client";

import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import LoginForm from "./LoginForm"; // Import form from local feature folder

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Darkened Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-md glass-panel rounded-2xl p-1 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Top Decorative Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-400 to-neon-500"></div>

        <div className="bg-bg-deep/50 p-6 md:p-8 rounded-xl">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-text-secondary hover:text-white transition"
          >
            <FaTimes size={20} />
          </button>
          
          <LoginForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}