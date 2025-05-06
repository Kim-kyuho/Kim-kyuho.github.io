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
      // GitHub username으로 관리자 판별
      (session.user as any).login = token.login;
      (session.user as any).isAdmin = token.login === "Kim-kyuho";
      return session;
    },
    async jwt({ token, user, account, profile }: any) {
      if (account && profile) {
        token.login = profile.login;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
