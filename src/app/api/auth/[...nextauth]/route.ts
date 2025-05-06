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
    async session({ session, token }) {
      if (session.user && typeof token === "object" && "login" in token) {
        (session.user as any).login = (token as any).login;
        (session.user as any).isAdmin = (token as any).login === "Kim-kyuho";
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile && "login" in profile) {
        (token as any).login = (profile as any).login;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
