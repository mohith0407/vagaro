import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { db } from "@repo/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const bets = await db.bet.findMany({
      where: { 
        user: { email: session.user.email } 
      },
      orderBy: { createdAt: 'desc' },
      take: 20 // Limit to last 20 bets
    });

    return NextResponse.json({ success: true, data: bets });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch history" }, { status: 500 });
  }
}