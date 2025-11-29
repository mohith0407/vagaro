"use client";

import { useUser } from "../../hooks/useUser";
import { Header } from "./Header";
import { BottomNav } from "@repo/ui/bottomNav"; // Ensure BottomNav is exported from UI
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { dbUser } = useUser();

  return (
    <div className="min-h-screen bg-bg-deep text-text-primary pb-24 md:pb-0">
      
      {/* 1. Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-bg-surface border-r border-border-subtle flex-col p-6 z-50">
        <div className="mb-10">
          <h1 className="text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-neon-400 to-neon-500">
            ROYAL SPIN
          </h1>
        </div>
        
        {/* Navigation Links would go here */}
        <nav className="flex-1 space-y-2">
           <div className="text-text-secondary text-sm px-2 mb-2 uppercase tracking-wider font-bold">Menu</div>
           {/* Add Sidebar Items here */}
        </nav>

        {/* User Mini Profile */}
        <div className="mt-auto glass-panel p-4 rounded-xl flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-400 to-neon-500 flex items-center justify-center font-bold text-black">
             {dbUser?.name?.[0] || "U"}
           </div>
           <div className="flex-1 overflow-hidden">
             <p className="text-sm font-bold truncate">{dbUser?.name}</p>
             <p className="text-xs text-neon-400 font-mono">₹{dbUser?.paperBalance?.toFixed(0)}</p>
           </div>
           <button onClick={() => signOut()} className="text-text-secondary hover:text-red-500 transition">
             <FaSignOutAlt />
           </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="md:ml-64">
        <Header user={dbUser} /> {/* Mobile Header */}
        <main className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </main>
      </div>

      {/* 3. Mobile Bottom Nav (Hidden on Desktop) */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}