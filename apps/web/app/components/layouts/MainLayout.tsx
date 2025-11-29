"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useUser } from "../../../hooks/useUser"; 
import { Button } from "@repo/ui/components/atoms/button";
import { FaWallet, FaUserCircle, FaSignOutAlt, FaGamepad, FaTrophy, FaHome } from "react-icons/fa";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const { dbUser } = useUser();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      
      {/* --- Sidebar (Desktop Only) --- */}
      <aside className="hidden md:flex w-64 flex-col border-r border-[#27272a] bg-[#0f0f11] fixed h-full z-50">
        <div className="p-6">
          <Link href="/" className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#16a34a]">
            ROYAL SPIN
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<FaHome />} label="Dashboard" href="/" active />
          <NavItem icon={<FaTrophy />} label="Sports" href="/sports" />
          <NavItem icon={<FaGamepad />} label="Casino" href="/casino" />
        </nav>

        {status === "authenticated" && (
          <div className="p-4 border-t border-[#27272a] mt-auto">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#050505] border border-[#27272a]">
              <div className="w-10 h-10 rounded-full bg-[#22c55e]/20 flex items-center justify-center text-[#22c55e] font-bold">
                {dbUser?.name?.[0] || "U"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate text-white">{dbUser?.name || "Player"}</p>
                <p className="text-xs font-mono text-[#4ade80]">₹{dbUser?.paperBalance?.toFixed(0) || 0}</p>
              </div>
              <button onClick={() => signOut()} className="text-[#a1a1aa] hover:text-[#ef4444] transition p-2">
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* --- Main Content --- */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#151518]/70 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-white/5">
          <div className="md:hidden">
            <span className="font-black text-[#4ade80] italic text-xl">ROYAL</span>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 ml-auto">
            {status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] text-[#a1a1aa] uppercase tracking-wider font-bold">Wallet</p>
                  <p className="text-sm font-bold text-[#4ade80] font-mono">₹{dbUser?.paperBalance?.toLocaleString() || "..."}</p>
                </div>
                <div className="md:hidden w-9 h-9 bg-[#22c55e]/20 rounded-full flex items-center justify-center text-[#22c55e]">
                  <FaUserCircle size={20} />
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, href, active }: any) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
        active 
          ? "bg-[#22c55e]/10 text-[#4ade80] border border-[#22c55e]/20" 
          : "text-[#a1a1aa] hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  );
}