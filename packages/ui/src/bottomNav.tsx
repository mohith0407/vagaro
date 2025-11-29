"use client";

import { FaHome, FaFutbol, FaWallet, FaUser, FaDice } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: FaHome, label: "Home", path: "/dashboard" },
    { icon: FaFutbol, label: "Sports", path: "/dashboard/sports" },
    { icon: FaDice, label: "Casino", path: "/dashboard/casino" }, // Center item usually
    { icon: FaWallet, label: "Wallet", path: "/dashboard/wallet" },
    { icon: FaUser, label: "Profile", path: "/dashboard/profile" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-50">
      <div className="glass rounded-full px-2 py-2 flex justify-between items-center shadow-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`
                p-3 rounded-full transition-all duration-300 relative
                ${isActive 
                  ? "bg-gradient-brand text-dark-bg shadow-neon -translate-y-1" 
                  : "text-text-muted hover:text-text-main hover:bg-dark-highlight"
                }
              `}
            >
              <Icon size={20} />
              {/* Optional: Dot indicator for active state if prefer cleaner look than bg */}
              {/* {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-primary rounded-full"></span>} */}
            </button>
          );
        })}
      </div>
    </div>
  );
}