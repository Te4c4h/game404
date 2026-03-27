import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await requireAuth();
    if (session?.user?.role !== "ADMIN") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const tournament = await prisma.tournament.findUnique({
      where: { id: params.id },
      include: { matches: true, registrations: { where: { paymentStatus: "APPROVED" } } }
    });

    if (!tournament) return NextResponse.json({ message: "Tournament not found" }, { status: 404 });
    if (tournament.matches.length > 0) return NextResponse.json({ message: "Bracket already exists" }, { status: 400 });

    const teams = tournament.registrations;
    const shuffled = [...teams].sort(() => Math.random() - 0.5);

    const maxTeams = tournament.maxTeams;
    const totalRounds = Math.log2(maxTeams);

    if (!Number.isInteger(totalRounds)) {
      return NextResponse.json({ message: "Invalid Max Teams count. Must be a power of 2." }, { status: 400 });
    }

    const matchesToCreate = [];

    // Round 1
    for (let i = 0; i < maxTeams / 2; i++) {
      const team1 = shuffled[i * 2]?.id || null;
      const team2 = shuffled[i * 2 + 1]?.id || null;

      matchesToCreate.push({
        tournamentId: params.id,
        round: 1,
        position: i + 1,
        team1Id: team1,
        team2Id: team2,
        // Auto-advance BYE slots instantly
        winnerId: team1 && !team2 ? team1 : (!team1 && team2 ? team2 : null),
        locked: Boolean(team1 && !team2) || Boolean(!team1 && team2),
      });
    }

    // Subsequent Rounds
    for (let round = 2; round <= totalRounds; round++) {
      const matchesInRound = maxTeams / Math.pow(2, round);
      for (let pos = 1; pos <= matchesInRound; pos++) {
        matchesToCreate.push({
          tournamentId: params.id,
          round,
          position: pos,
          team1Id: null,
          team2Id: null,
          winnerId: null,
          locked: false,
        });
      }
    }

    // Using transaction sequentially handles Prisma relational bugs occasionally seen with createMany
    for (const match of matchesToCreate) {
      await prisma.match.create({ data: match });
    }

    // Progress advance initial BYES
    const initialMatches = await prisma.match.findMany({ where: { tournamentId: params.id, round: 1 } });
    for (const m of initialMatches) {
      if (m.winnerId) {
        const nextRound = 2;
        const nextPosition = Math.ceil(m.position / 2);
        const nextMatch = await prisma.match.findFirst({
          where: { tournamentId: params.id, round: nextRound, position: nextPosition }
        });
        if (nextMatch) {
          const isSlot1 = m.position % 2 !== 0;
          await prisma.match.update({
            where: { id: nextMatch.id },
            data: isSlot1 ? { team1Id: m.winnerId } : { team2Id: m.winnerId }
          });
        }
      }
    }

    if (tournament.status === "OPEN") {
      await prisma.tournament.update({
        where: { id: params.id },
        data: { status: "ONGOING" }
      });
    }

    return NextResponse.json({ message: "Bracket generated" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
