// src/components/AuthStatus.tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthStatus() {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>Loading...</p>;

  if (!session?.user) {
    return (
      <button
        onClick={() => signIn("github")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Login with GitHub
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">Hi, {session.user.name}</span>
      <span className="text-xs font-medium">
        {session.user.isAdmin ? "(Admin)" : "(Viewer)"}
      </span>
      <button
        onClick={() => signOut()}
        className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500"
      >
        Logout
      </button>
    </div>
  );
}