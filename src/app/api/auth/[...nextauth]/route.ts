// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile && typeof profile === "object" && "login" in profile) {
        token.login = (profile as { login: string }).login;
        token.isAdmin = token.login === "Kim-kyuho";
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          login: token.login,
          isAdmin: token.isAdmin,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };