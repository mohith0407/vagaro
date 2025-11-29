"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useProtectedAction() {
  const { status } = useSession();
  const router = useRouter();

  /**
   * Wraps an action. If logged in, runs the action.
   * If guest, redirects to login.
   */
  const withAuth = (action: () => void) => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "loading") return;
    
    // User is authenticated, proceed
    action();
  };

  return { withAuth, isAuthenticated: status === "authenticated" };
}