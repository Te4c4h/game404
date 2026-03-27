import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { GameStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");

    const where = statusParam ? { status: statusParam as GameStatus } : {};

    const games = await prisma.game.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(games);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
