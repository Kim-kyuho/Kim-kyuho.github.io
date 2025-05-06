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
          email: profile.email ?? "",
          image: profile.avatar_url ?? "",
          login: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    // JWT 토큰에 login/isAdmin 추가
    async jwt({ token, user }) {
      if (user && "login" in user) {
        token.login = user.login;
        token.isAdmin = user.login === "Kim-kyuho";
      }
      return token;
    },
    // 세션에 token 속성을 머지
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