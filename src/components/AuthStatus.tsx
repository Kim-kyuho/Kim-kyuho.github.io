"use client";
// src/components/AuthStatus.tsx
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthStatus() {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>Loading...</p>;

  if (!session?.user) {
    return (
      <button
        onClick={() => signIn("github")}
        className="px-4 py-1 bg-blue-200 text-blue-800 rounded-md hover:bg-blue-300 transition"
      >
        Login with GitHub
      </button>
    );
  }

  // Type assertion to access custom properties
  const user = session.user as { 
    name?: string | null; 
    login?: string; 
    isAdmin?: boolean; 
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">
        Hi, {user.login ?? user.name}
      </span>
      <span
        className={`text-xs font-semibold ${
          user.isAdmin ? "text-green-600" : "text-gray-500"
        }`}
      >
        {user.isAdmin ? "Admin" : "Viewer"}
      </span>
      <button
        onClick={() => signOut()}
        className="px-4 py-1 bg-red-200 text-red-800 rounded-md hover:bg-red-300 transition"
      >
        Logout
      </button>
    </div>
  );
}