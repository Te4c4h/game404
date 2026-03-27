import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "CAPTAIN";
      status: "ACTIVE" | "BANNED";
    } & DefaultSession["user"];
  }

  interface User {
    role?: "ADMIN" | "CAPTAIN";
    status?: "ACTIVE" | "BANNED";
  }
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "CAPTAIN";
    status: "ACTIVE" | "BANNED";
  }
}
