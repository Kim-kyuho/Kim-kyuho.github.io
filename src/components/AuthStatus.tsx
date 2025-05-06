// src/components/AuthStatus.tsx

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthStatus() {
  const { data: session } = useSession() as {
    data: {
      user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        isAdmin?: boolean;
      };
    };
  };

  if (!session || !session.user) {
    return (
      <button
        onClick={() => signIn("github")}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Login with GitHub
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <p className="text-sm text-gray-600">Hi, {session.user.name}</p>
      <p className="text-sm font-semibold">
        {session.user.isAdmin ? "(Admin)" : "(Viewer)"}
      </p>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
