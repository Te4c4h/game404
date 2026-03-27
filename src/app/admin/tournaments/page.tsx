import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TournamentTableClient } from "./TournamentTableClient";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminTournamentsPage() {
  const session = await requireAuth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/login");

  const tournaments = await prisma.tournament.findMany({
    include: {
      game: { select: { name: true } },
      _count: { select: { registrations: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
          Tournaments
        </h1>
        <Link 
          href="/admin/tournaments/create"
          className="flex items-center bg-primary text-[#0A0A0A] font-sans font-semibold px-6 py-2.5 rounded-[8px] hover:bg-[#00CC6A] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Tournament
        </Link>
      </div>

      <TournamentTableClient tournaments={tournaments} />
    </div>
  );
}
