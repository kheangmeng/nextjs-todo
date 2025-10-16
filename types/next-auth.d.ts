import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// Extend the `user` object in the `authorize` callback
declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    id: string;
    username: string;
    email: string;
    role: string;
  }

  interface Session extends DefaultSession {
    user: {
      accessToken: string;
      refreshToken: string;
      id: string;
      username: string;
      email: string;
      role: string;
    } & DefaultSession["user"];
  }
}

// Extend the `token` object in the `jwt` callback
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
  }
}
