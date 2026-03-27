import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { TournamentStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");

    const where = statusParam ? { status: statusParam as TournamentStatus } : {};

    const tournaments = await prisma.tournament.findMany({
      where,
      include: { game: true },
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json(tournaments);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
