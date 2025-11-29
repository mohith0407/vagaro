import { NextResponse } from "next/server";
import { db } from "@repo/db";

// NOTE: In production, you MUST protect this route with an ADMIN secret check!
export async function POST(req: Request) {
  try {
    const { matchId, winner } = await req.json(); // winner = "India" or "Draw"

    if (!matchId || !winner) {
      return NextResponse.json({ message: "Missing matchId or winner" }, { status: 400 });
    }

    // 1. Find all PENDING bets for this match
    const bets = await db.bet.findMany({
      where: {
        matchId: matchId,
        status: "PENDING"
      },
      include: { user: true } // Need user info to update balance
    });

    if (bets.length === 0) {
      return NextResponse.json({ message: "No pending bets found for this match" });
    }

    const results = [];

    // 2. Process each bet (Loop)
    for (const bet of bets) {
      const isWin = bet.selection === winner;
      
      if (isWin) {
        // WINNER LOGIC: Transaction to add money & update bet
        const payout = bet.payout || 0;
        
        await db.$transaction([
          // A. Add Money to Wallet
          db.user.update({
            where: { id: bet.userId },
            data: { paperBalance: { increment: payout } }
          }),
          // B. Mark Bet as WON
          db.bet.update({
            where: { id: bet.id },
            data: { status: "WON", result: "WIN" }
          }),
          // C. Create Transaction Record
          db.transaction.create({
            data: {
              userId: bet.userId,
              amount: payout,
              type: "BET_WON",
              status: "COMPLETED"
            }
          })
        ]);
        results.push({ id: bet.id, result: "WON", payout });
      } else {
        // LOSER LOGIC: Just mark as lost
        await db.bet.update({
          where: { id: bet.id },
          data: { status: "LOST", result: "LOSS" }
        });
        results.push({ id: bet.id, result: "LOST", payout: 0 });
      }
    }

    return NextResponse.json({ 
      success: true, 
      processed: results.length, 
      results 
    });

  } catch (error) {
    console.error("Settlement Error:", error);
    return NextResponse.json({ message: "Settlement Failed" }, { status: 500 });
  }
}