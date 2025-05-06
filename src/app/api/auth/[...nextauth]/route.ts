// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email ?? "",
          image: profile.avatar_url ?? "",
          login: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && "login" in user) {
        token.login = user.login;
        token.isAdmin = user.login === "Kim-kyuho";
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          login: token.login as string,
          isAdmin: token.isAdmin as boolean,
        },
      };
    },
  },
});