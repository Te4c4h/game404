import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { BracketClient } from "./BracketClient";

export default async function AdminBracketPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await requireAuth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/login");

  const tournament = await prisma.tournament.findUnique({
    where: { id: params.id },
    include: {
      matches: true,
      registrations: { where: { paymentStatus: "APPROVED" } }
    }
  });

  if (!tournament) notFound();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
          Bracket Structure
        </h1>
        <p className="text-primary font-bold text-xl mt-2 tracking-wide uppercase">{tournament.name}</p>
      </div>

      <BracketClient 
        tournamentId={tournament.id} 
        matches={tournament.matches} 
        registrations={tournament.registrations} 
      />
    </div>
  );
}
