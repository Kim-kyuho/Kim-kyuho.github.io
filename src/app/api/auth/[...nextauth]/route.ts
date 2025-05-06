import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          login: profile.login, // GitHub 사용자명
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
      if (session.user) {
        (session.user as any).login = token.login;
        (session.user as any).isAdmin = token.isAdmin;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };