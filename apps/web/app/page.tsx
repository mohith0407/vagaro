import { FaBolt, FaTrophy, FaGamepad, FaChevronRight } from "react-icons/fa";
import { MainLayout } from "./components/layouts/MainLayout";
import { Button } from "@repo/ui/components/atoms/button";
import { MatchCard } from "./components/features/betting/MatchCard";
import { fetchLiveMatches } from "./lib/odds-api"; // Import the fetcher

// Revalidate this page every hour to keep odds fresh
export const revalidate = 3600;

export default async function Dashboard() {
  // 1. Fetch Real Matches from The Odds API
  const matches = await fetchLiveMatches();

  return (
    <MainLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* --- Hero Banner --- */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-primary-900 p-8 md:p-12 text-white border border-primary-500/20 shadow-2xl shadow-primary-500/10">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-sm">
                Welcome Bonus
              </span>
              <span className="inline-block px-3 py-1 bg-primary-500 text-black text-xs font-bold rounded-full uppercase tracking-wider">
                Limited Time
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-4 italic tracking-tight">
              DOUBLE YOUR <br /> 
              <span className="text-primary-300">FIRST DEPOSIT</span>
            </h1>
            
            <p className="text-primary-100 text-lg mb-8 max-w-md leading-relaxed font-medium">
              Join thousands of players betting on live sports. Sign up now to claim your <span className="font-bold text-white">₹1,000 welcome bonus</span> instantly.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="shadow-lg shadow-primary-500/20">
                Claim Bonus Now
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                View Promotions
              </Button>
            </div>
          </div>
          
          {/* Abstract Background Decoration */}
          <div className="absolute right-0 top-0 h-full w-2/3 bg-white/5 -skew-x-12 transform translate-x-32 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* --- Live Matches Grid --- */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
              <FaBolt className="text-danger animate-pulse" />
              Live & Upcoming
            </h2>
            <div className="flex items-center gap-4">
              <p className="text-xs text-text-secondary">Powered by The Odds API</p>
              <button className="text-sm font-bold text-primary-400 hover:text-primary-300 transition flex items-center gap-1">
                View All <FaChevronRight size={10} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.length > 0 ? (
              matches.map((m) => (
                <MatchCard 
                  key={m.id} 
                  id={m.id}
                  teamA={m.teamA}
                  teamB={m.teamB}
                  time={m.startTime}
                  status={m.status}
                  odds={m.odds}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center border border-dashed border-border rounded-xl">
                <p className="text-text-secondary">
                  No live matches available right now. Check back later!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* --- Categories Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-bg-panel border border-border rounded-3xl p-8 relative overflow-hidden group cursor-pointer hover:border-primary-500/50 transition-all">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-500 mb-6 text-3xl">
                <FaGamepad />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">Casino Games</h3>
              <p className="text-text-secondary text-sm mb-6">Slots, Roulette, Blackjack & more.</p>
              <span className="text-sm font-bold text-primary-400 group-hover:underline">Play Now</span>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] text-9xl text-white/5 rotate-12 group-hover:scale-110 transition-transform">
              <FaGamepad />
            </div>
          </div>

          <div className="bg-bg-panel border border-border rounded-3xl p-8 relative overflow-hidden group cursor-pointer hover:border-primary-500/50 transition-all">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 text-3xl">
                <FaTrophy />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">Sports Betting</h3>
              <p className="text-text-secondary text-sm mb-6">Cricket, Football, Tennis & more.</p>
              <span className="text-sm font-bold text-blue-400 group-hover:underline">Bet Now</span>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] text-9xl text-white/5 rotate-12 group-hover:scale-110 transition-transform">
              <FaTrophy />
            </div>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}