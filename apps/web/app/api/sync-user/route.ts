// apps/web/src/app/api/sync-user/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { db } from "@repo/db"; // Direct DB connection!

export async function POST(req: Request) {
  // 1. Verify User (Backend Security)
  console.log("----------------------------------------");
  console.log("DEBUG: Connecting to Database...");
  console.log("DEBUG: URL Exists?", !!process.env.DATABASE_URL); 
  // DO NOT log the full URL for security, just check if it's there.
  console.log("----------------------------------------");
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse the body (if you sent extra data, though session usually has enough)
  // const body = await req.json(); 

  try {
    // 3. Database Logic (Prisma)
    const user = await db.user.upsert({
      where: { 
        // We link by email or cognitoId. 
        // Ideally use cognitoId if available in session, otherwise email.
        email: session.user.email 
      },
      update: {
        name: session.user.name,
        // Update login timestamp if you had that field
      },
      create: {
        email: session.user.email,
        username: session.user.email, // Fallback
        cognitoId: session.user.id, // Saved from AWS-Auth package
        name: session.user.name,
        paperBalance: 1000.00, // ✅ Free money logic
        balance: 0.00
      }
    });

    // 4. Return the real DB user
    return NextResponse.json({ success: true, user });

  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}