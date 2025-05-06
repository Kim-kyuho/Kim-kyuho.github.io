import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      login?: string;
      isAdmin?: boolean;
    };
  }

  interface User extends DefaultUser {
    login?: string;
    isAdmin?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    login?: string;
    isAdmin?: boolean;
  }
}