import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request, props: { params: Promise<{ matchId: string }> }) {
  const params = await props.params;
  try {
    const session = await requireAuth();
    if (session?.user?.role !== "ADMIN") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { score1, score2, winnerId } = body;

    const match = await prisma.match.findUnique({
      where: { id: params.matchId },
      include: { tournament: true }
    });

    if (!match) return NextResponse.json({ message: "Match not found" }, { status: 404 });

    await prisma.match.update({
      where: { id: params.matchId },
      data: { score1: Number(score1), score2: Number(score2), winnerId, locked: !!winnerId }
    });

    // If winner is declared, advance them to next round!
    if (winnerId) {
      const tournament = await prisma.tournament.findUnique({
        where: { id: match.tournamentId }
      });
      const totalRounds = Math.log2(tournament!.maxTeams);

      if (match.round < totalRounds) {
        const nextRound = match.round + 1;
        const nextPosition = Math.ceil(match.position / 2);
        
        const nextMatch = await prisma.match.findFirst({
          where: { tournamentId: match.tournamentId, round: nextRound, position: nextPosition }
        });

        if (nextMatch) {
          const isSlot1 = match.position % 2 !== 0;
          await prisma.match.update({
            where: { id: nextMatch.id },
            data: isSlot1 ? { team1Id: winnerId } : { team2Id: winnerId }
          });
        }
      } else if (match.round === totalRounds) {
        await prisma.tournament.update({
          where: { id: match.tournamentId },
          data: { status: "COMPLETED" }
        });
      }
    }

    return NextResponse.json({ message: "Match updated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update match" }, { status: 500 });
  }
}
