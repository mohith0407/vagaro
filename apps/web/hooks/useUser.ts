// apps/web/src/hooks/useUser.ts
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function useUser() {
  const { data: session, status } = useSession();
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only run if authenticated
    if (status === "authenticated" && session) {
      syncUser();
    }
  }, [status, session]);

  async function syncUser() {
    setLoading(true);
    try {
      // Call the Next.js API Route we just made
      const res = await fetch("/api/sync-user", { method: "POST" });
      const data = await res.json();
      
      if (data.success) {
        setDbUser(data.user);
      }
    } catch (error) {
      console.error("Failed to sync user", error);
    } finally {
      setLoading(false);
    }
  }

  return { dbUser, loading, session };
}