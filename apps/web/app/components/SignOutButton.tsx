// apps/web/src/components/SignOutButton.tsx
"use client";

import { signOut } from "next-auth/react";
const handleSignOut = async () => {
  await signOut({ redirect: false });
  window.location.href = "/"; // Redirect to homepage after sign out
}
export function SignOutButton() {
  return (
    <button
      onClick={handleSignOut}
      className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
    >
      Sign Out
    </button>
  );
}