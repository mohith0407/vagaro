"use client";

import { Card } from "@repo/ui/components/molecules/card";
import { useProtectedAction } from "../../../../hooks/useProtectedAction";

interface MatchProps {
  id: string; // <--- ADDED ID PROP
  teamA: string;
  teamB: string;
  time: string;
  status: string; // Added status to handle "LIVE" styling
  odds: { a: number; draw: number; b: number };
}

export function MatchCard({ id, teamA, teamB, time, status, odds }: MatchProps) {
  const { withAuth } = useProtectedAction();

  const handleBet = (selection: string, odd: number) => {
    withAuth(async () => {
      if(!confirm(`Place ₹100 bet on ${selection} @ ${odd}?`)) return;

      try {
        const res = await fetch("/api/bet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            matchId: id, // <--- USE REAL ID HERE
            selection: selection,
            amount: 100,
            odds: odd,
            useRealMoney: false // Keeping as paper money for testing
          })
        });

        const data = await res.json();

        if (data.success) {
          alert(`Success! Bet Placed. ID: ${data.betId}`);
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (err) {
        alert("Failed to connect to server");
      }
    });
  };

  const isLive = status === "LIVE";

  return (
    <Card className="hover:border-primary-500/50 transition-colors group relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2 items-center">
            {isLive ? (
              <>
                <span className="w-2 h-2 rounded-full bg-danger animate-pulse shadow-[0_0_8px_red]" />
                <span className="text-xs font-bold text-danger uppercase tracking-wider">Live</span>
              </>
            ) : (
              <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">Upcoming</span>
            )}
          </div>
          <span className="text-xs text-text-secondary font-mono">
            {new Date(time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-center w-1/3">
            <span className="font-bold text-sm block text-text-primary truncate">{teamA}</span>
          </div>
          
          <div className="text-xl font-black text-primary-400 italic">VS</div>
          
          <div className="text-center w-1/3">
            <span className="font-bold text-sm block text-text-primary truncate">{teamB}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <BetButton odd={odds.a} label="1" onClick={() => handleBet(teamA, odds.a)} />
          <BetButton odd={odds.draw} label="X" onClick={() => handleBet("Draw", odds.draw)} />
          <BetButton odd={odds.b} label="2" onClick={() => handleBet(teamB, odds.b)} />
        </div>
      </div>
    </Card>
  );
}

function BetButton({ odd, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center py-2 rounded-lg bg-bg-app border border-border hover:border-primary-500 hover:bg-primary-500/10 transition-all group active:scale-95"
    >
      <span className="text-[10px] text-text-secondary group-hover:text-primary-400 font-bold">{label}</span>
      <span className="text-sm font-bold text-text-primary">{odd}</span>
    </button>
  );
}