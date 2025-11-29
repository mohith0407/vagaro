"use client";

import { useState } from "react";
// Using relative path for local component to avoid alias resolution issues
import { AuthModal } from "./AuthModel";
// Using the UI package import
import { Button } from "@repo/ui/components/button";

export default function LandingPage() {
  const [isAuthOpen, setAuthOpen] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col bg-dark-bg overflow-hidden">
      
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-[60%] bg-linear-to-b from-brand-primary/20 to-dark-bg z-0 pointer-events-none opacity-50 blur-3xl rounded-full translate-y-[-50%]"></div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-end pb-12 px-6 max-w-md mx-auto w-full text-center h-screen">
        
        {/* Placeholder for Character Image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-primary/10 rounded-full blur-2xl animate-pulse"></div>
        
        <h1 className="text-4xl font-black text-text-main mb-2 tracking-tight uppercase">
          Welcome to <br />
          <span className="text-transparent bg-clip-text bg-gradient-brand">Royal Spin</span>
        </h1>
        
        <p className="text-text-muted mb-8 text-sm leading-relaxed">
          From Slots to Cards and Dice Rolls. Every Spin Brings You Closer to Fortune.
          Feel the Power of Pure Entertainment.
        </p>

        <Button 
          size="lg" 
          fullWidth 
          onClick={() => setAuthOpen(true)} 
          className="animate-bounce-subtle shadow-neon" 
        >
          Start Playing
        </Button>

        <p className="text-xs text-text-muted mt-6">
          By playing, you agree to our Terms & Conditions.
        </p>
      </div>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setAuthOpen(false)} 
      />
    </main>
  );
}