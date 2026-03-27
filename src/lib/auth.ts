import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isAdminLogin: { label: "isAdminLogin", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;
        const isAdminLogin = credentials.isAdminLogin === "true";

        if (isAdminLogin) {
          if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
          ) {
            return {
              id: "admin",
              name: "Admin",
              email: process.env.ADMIN_EMAIL,
              role: "ADMIN",
              status: "ACTIVE"
            };
          }
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return null;

        if (user.status === "BANNED") {
          throw new Error("Access Denied: Account Banned");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as "ADMIN" | "CAPTAIN";
        token.status = user.status as "ACTIVE" | "BANNED";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "CAPTAIN";
        session.user.status = token.status as "ACTIVE" | "BANNED";
      }
      return session;
    }
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  }
});

export async function requireAuth() {
  const session = await auth();
  if (!session?.user || session.user.status === "BANNED") {
    return null;
  }
  return session;
}
