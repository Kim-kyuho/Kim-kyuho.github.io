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
      if (profile) {
        const githubProfile = profile as any; // 타입 단언
        token.login = githubProfile.login;
        token.isAdmin = githubProfile.login === "Kim-kyuho";
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