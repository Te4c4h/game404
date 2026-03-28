import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
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

        // Check if email is verified
        if (!user.emailVerified) {
          throw new Error("Please verify your email before logging in");
        }

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
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) return false;

        // Check if user exists
        let dbUser = await prisma.user.findUnique({
          where: { email }
        });

        // Create user if doesn't exist
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email,
              name: user.name || email.split("@")[0],
              passwordHash: "", // Google users don't need password
              role: "CAPTAIN",
              status: "ACTIVE",
              emailVerified: new Date(), // Auto-verify Google users
            }
          });
        }

        // Update user object with DB data
        user.id = dbUser.id;
        user.role = dbUser.role;
        user.status = dbUser.status;
      }
      return true;
    },
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
    error: "/login",
  }
});

export async function requireAuth() {
  const session = await auth();
  if (!session?.user || session.user.status === "BANNED") {
    return null;
  }
  return session;
}
