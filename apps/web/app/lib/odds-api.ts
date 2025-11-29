const API_KEY = process.env.THE_ODDS_API_KEY;
const BASE_URL = "https://api.the-odds-api.com/v4/sports";

// Types matching the External API response
interface ExternalMatch {
  id: string;
  sport_key: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: {
    key: string;
    markets: {
      key: string;
      outcomes: { name: string; price: number }[];
    }[];
  }[];
}

export async function fetchLiveMatches() {
  if (!API_KEY) {
    console.error("Missing THE_ODDS_API_KEY");
    return [];
  }

  // Fetching Premier League odds (Change 'soccer_epl' to 'upcoming' for all sports)
  // We use 'eu' region for decimal odds (e.g. 1.50)
  const url = `${BASE_URL}/soccer_epl/odds/?apiKey=${API_KEY}&regions=eu&markets=h2h&oddsFormat=decimal`;

  try {
    const res = await fetch(url, { 
      next: { revalidate: 3600 } // Cache for 1 hour to save API quota
    });
    
    if (!res.ok) throw new Error("Failed to fetch odds");

    const data: ExternalMatch[] = await res.json();

    // Transform external data to our App's Match format
    return data.map((match) => {
      // Find a bookmaker (we usually pick the first one, e.g., Unibet/William Hill)
      const bookmaker = match.bookmakers[0];
      const market = bookmaker?.markets.find((m) => m.key === "h2h"); // Head to head market

      // Extract odds
      const home = market?.outcomes.find((o) => o.name === match.home_team)?.price || 0;
      const away = market?.outcomes.find((o) => o.name === match.away_team)?.price || 0;
      const draw = market?.outcomes.find((o) => o.name === "Draw")?.price || 0;

      return {
        id: match.id,
        teamA: match.home_team,
        teamB: match.away_team,
        startTime: match.commence_time,
        // Status logic based on time
        status: new Date(match.commence_time) < new Date() ? "LIVE" : "UPCOMING", 
        odds: {
          a: home,
          b: away,
          draw: draw,
        },
      };
    });
  } catch (error) {
    console.error("Odds API Error:", error);
    return []; // Return empty array on error so app doesn't crash
  }
}