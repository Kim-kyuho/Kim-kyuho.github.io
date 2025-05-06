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
        className="px-4 py-2 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
      >
        Login with GitHub
      </button>
    );
  }

  const user = session.user;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">
        Hi, {user.login ?? user.name}
      </span>
      <span className={`text-xs font-semibold ${user.isAdmin ? "text-green-600" : "text-gray-500"}`}>
        {user.isAdmin ? "Admin" : "Viewer"}
      </span>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-200 text-red-800 rounded hover:bg-red-300"
      >
        Logout
      </button>
    </div>
  );
}