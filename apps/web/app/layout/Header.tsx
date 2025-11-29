import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

export function Header({ user }: { user: any }) {
  return (
    <header className="sticky top-0 z-40 bg-bg-deep/80 backdrop-blur-md border-b border-border-subtle px-4 py-4 md:hidden">
      <div className="flex items-center justify-between">
        
        {/* Mobile Logo */}
        <h1 className="font-black italic text-neon-400 text-lg">ROYAL SPIN</h1>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
             <span className="text-[10px] text-text-secondary uppercase">Balance</span>
             <span className="text-sm font-bold text-neon-400 font-mono">
               ₹{user?.paperBalance?.toLocaleString() || "0"}
             </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-bg-surface border border-border-subtle flex items-center justify-center">
             <FaUserCircle className="text-text-secondary" />
          </div>
        </div>
      </div>
    </header>
  );
}