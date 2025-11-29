import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { db } from "@repo/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { 
        user: { email: session.user.email } 
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    return NextResponse.json({ success: true, data: transactions });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch transactions" }, { status: 500 });
  }
}