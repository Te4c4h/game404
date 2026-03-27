import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { GameTableClient } from "./GameTableClient";

export default async function AdminGamesPage() {
  const session = await requireAuth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/login");

  const games = await prisma.game.findMany({
    include: {
      tournaments: { select: { status: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl mx-auto">
      <GameTableClient games={games} />
    </div>
  );
}
