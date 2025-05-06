import NextAuth from "next-auth/next";

// Initialize NextAuth handler
const handler = NextAuth({
});

export { handler as GET, handler as POST };