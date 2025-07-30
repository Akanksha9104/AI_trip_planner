"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export function SignOutButton() {
  const isAuthenticated = useQuery(api.auth.isAuthenticated) || false;
  const signOut = useMutation(api.auth.signOut);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      className="px-4 py-2 rounded-lg transition-colors bg-blue-500 text-white"
      onClick={() => void signOut({})}
    >
      Sign out
    </button>
  );
}
