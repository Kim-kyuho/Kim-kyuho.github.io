// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          login: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.login = user.login;
        token.isAdmin = user.login === "Kim-kyuho";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.login = token.login;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };