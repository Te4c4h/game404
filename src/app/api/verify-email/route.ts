import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ message: "Missing token" }, { status: 400 });
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    });

    if (!verificationToken) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    if (verificationToken.expires < new Date()) {
      return NextResponse.json({ message: "Token expired" }, { status: 400 });
    }

    // Update user emailVerified
    await prisma.user.update({
      where: { email: verificationToken.email },
      data: { emailVerified: new Date() }
    });

    // Delete used token
    await prisma.verificationToken.delete({
      where: { token }
    });

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
