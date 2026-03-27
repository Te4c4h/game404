import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const registrationSchema = z.object({
  teamName: z.string().min(1, "Team Name is required"),
  players: z.array(z.object({
    nickname: z.string().min(1, "Nickname required"),
    discord: z.string().min(1, "Discord or Tracker required")
  })).min(1, "At least one player required"),
  paymentProofUrl: z.string().url("Payment Proof image is required")
});

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await requireAuth();
    if (!session || session.user.role !== "CAPTAIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const tournament = await prisma.tournament.findUnique({
      where: { id: params.id },
      include: { _count: { select: { registrations: true } } }
    });

    if (!tournament) return NextResponse.json({ message: "Tournament not found" }, { status: 404 });
    if (tournament.status !== "OPEN") return NextResponse.json({ message: "Registration is closed" }, { status: 400 });
    if (tournament._count.registrations >= tournament.maxTeams) {
      return NextResponse.json({ message: "Tournament is full" }, { status: 400 });
    }

    const existingReg = await prisma.registration.findFirst({
      where: { tournamentId: params.id, userId: session.user.id }
    });

    if (existingReg) {
      return NextResponse.json({ message: "You have already registered for this tournament." }, { status: 400 });
    }

    const body = await req.json();
    const parsed = registrationSchema.parse(body);

    const registration = await prisma.registration.create({
      data: {
        tournamentId: params.id,
        userId: session.user.id,
        teamName: parsed.teamName,
        players: parsed.players,
        paymentProofUrl: parsed.paymentProofUrl,
        paymentStatus: "PENDING"
      }
    });

    return NextResponse.json({ message: "Registration submitted successfully", registrationId: registration.id }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: (error as any).errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
