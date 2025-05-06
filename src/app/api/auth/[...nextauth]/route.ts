// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        // GitHub 프로필에서 필요한 필드만 추출
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
    async jwt({ token, user, profile }) {
      if (user) {
        // `profile` 콜백에서 추가한 login 필드
        token.login = (user as any).login;
        token.isAdmin = token.login === "Kim-kyuho";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.login = token.login as string;
      session.user.isAdmin = token.isAdmin as boolean;
      return session;
    },
  },
});