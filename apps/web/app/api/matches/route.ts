import { NextResponse } from "next/server";
import { fetchLiveMatches } from "../../lib/odds-api";

export async function GET() {
  const matches = await fetchLiveMatches();

  // Fallback Mock Data (Only used if API quota exceeded or fails)
  if (matches.length === 0) {
    return NextResponse.json({
      success: true,
      source: "mock",
      data: [
        {
          id: "mock_1",
          teamA: "Mock: Man City",
          teamB: "Mock: Arsenal",
          startTime: new Date().toISOString(),
          status: "LIVE",
          odds: { a: 1.8, draw: 3.5, b: 4.2 }
        }
      ]
    });
  }

  return NextResponse.json({ success: true, source: "live", data: matches });
}