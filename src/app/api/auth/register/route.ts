import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { sendVerificationEmail } from "@/lib/email";
import crypto from "crypto";

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ message: "This email is already registered." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "CAPTAIN",
        emailVerified: null,
      }
    });

    // Generate verification token
    const token = crypto.randomUUID();
    await prisma.verificationToken.create({
      data: {
        email,
        token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      }
    });

    // Send verification email
    await sendVerificationEmail(email, token);

    return NextResponse.json({ message: "Account created. Please check your email to verify." }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: (error as any).errors[0].message }, { status: 400 });
    }
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
