import { FaSearch, FaBell } from "react-icons/fa";
import { Input } from "@repo/ui/input";
import { SignOutButton } from "./SignOutButton";

export function Header({ user }: { user: any }) {
  return (
    <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-md border-b border-dark-highlight px-4 py-3">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        
        {/* Logo */}
        <div className="flex flex-col">
          <h1 className="font-black text-lg tracking-tighter text-transparent bg-clip-text bg-gradient-brand">
            ROYAL SPIN
          </h1>
          <span className="text-[10px] text-text-muted uppercase tracking-widest -mt-1">Casino</span>
        </div>

        {/* Search Bar (Hidden on very small screens, visible on mobile) */}
        <div className="flex-1 max-w-xs hidden sm:block">
           <Input 
             placeholder="Search Games..." 
             icon={FaSearch} 
             className="py-2! text-sm!" // Override padding for compact header
           />
        </div>

        {/* User Info / Icons */}
        <div className="flex items-center gap-4">
          <button className="text-text-muted hover:text-text-main relative">
            <FaBell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center  font-bold text-sm text-white">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <SignOutButton/>
        </div>
      </div>
    </header>
  );
}