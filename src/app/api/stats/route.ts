import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [gamesCount, tournamentsCount, usersCount, completedCount] = await Promise.all([
      prisma.game.count({ where: { status: "ACTIVE" } }),
      prisma.tournament.count({ where: { status: { in: ["OPEN", "ONGOING"] } } }),
      prisma.user.count({ where: { role: "CAPTAIN" } }),
      prisma.tournament.count({ where: { status: "COMPLETED" } }),
    ]);

    return NextResponse.json({ gamesCount, tournamentsCount, usersCount, completedCount });
  } catch {
    return NextResponse.json({ gamesCount: 0, tournamentsCount: 0, usersCount: 0, completedCount: 0 });
  }
}
