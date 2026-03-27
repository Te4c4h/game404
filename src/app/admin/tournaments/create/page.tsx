import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { TournamentForm } from "@/components/admin/TournamentForm";

export default async function CreateTournamentPage() {
  const session = await requireAuth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/login");

  const games = await prisma.game.findMany({
    where: { status: "ACTIVE" },
    select: { id: true, name: true }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-[32px] md:text-4xl font-bold uppercase tracking-wide text-white">
          Create Tournament
        </h1>
      </div>
      <TournamentForm games={games} />
    </div>
  );
}
