import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { db } from "@repo/db"; 

export async function POST(req: Request) {
  try {
    // 1. Secure the Endpoint
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { matchId, selection, amount, odds } = body;

    // 2. Validate Input
    if (!matchId || !selection || !amount || amount <= 0) {
      return NextResponse.json({ message: "Invalid bet data" }, { status: 400 });
    }

    // 3. Get User Balance
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 4. Check Funds
    if (user.paperBalance < amount) {
      return NextResponse.json({ message: "Insufficient funds" }, { status: 400 });
    }

    // 5. Execute Transaction (Atomic Operation)
    const result = await db.$transaction([
      // Step A: Deduct Money
      db.user.update({
        where: { id: user.id },
        data: { paperBalance: { decrement: amount } },
      }),
      // Step B: Create Bet Record
      db.bet.create({
        data: {
          userId: user.id,
          matchId,
          selection,
          amount,
          odds,
          payout: amount * odds,
          status: "PENDING",
          isRealMoney: false, 
        },
      }),
      // Step C: Create Transaction Record (NEW)
      db.transaction.create({
        data: {
          userId: user.id,
          amount: amount, // Log the amount spent
          type: "BET_PLACED", // Ensure this enum exists in your schema
          status: "COMPLETED"
        }
      })
    ]);

    return NextResponse.json({ 
      success: true, 
      newBalance: result[0].paperBalance,
      betId: result[1].id 
    });

  } catch (error) {
    console.error("Betting Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}