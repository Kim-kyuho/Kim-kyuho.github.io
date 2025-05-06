"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthStatus() {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>Loading...</p>;

  if (!session?.user) {
    return (
      <button onClick={() => signIn("github")}>Login with GitHub</button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span>Hi, {session.user.name}</span>
      <span>{session.user.isAdmin ? "(Admin)" : "(Viewer)"}</span>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}