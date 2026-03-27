import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { RegistrationForm } from "@/components/tournaments/RegistrationForm";
import { Banknote, Trophy } from "lucide-react";

export default async function TournamentRegistrationPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await requireAuth();
  if (!session) redirect("/login");
  if (session.user.role !== "CAPTAIN") redirect("/admin");

  const tournament = await prisma.tournament.findUnique({
    where: { id: params.id },
    include: { game: true, _count: { select: { registrations: true } } }
  });

  if (!tournament || tournament.status !== "OPEN") notFound();

  const existingReg = await prisma.registration.findFirst({
    where: { tournamentId: params.id, userId: session.user.id }
  });

  if (existingReg) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="font-heading text-4xl md:text-[48px] font-extrabold uppercase tracking-wide text-white mb-3">
            Register for Tournament
          </h1>
          <p className="font-sans text-xl text-primary font-bold bg-primary/10 inline-flex px-6 py-2 rounded-xl border border-primary/20">
            {tournament.name}
          </p>
        </div>

        <div className="bg-[#111111] p-6 lg:p-8 rounded-xl border border-[#2A2A2A] mb-8 shadow-xl">
          <h3 className="font-heading text-[22px] tracking-wide font-bold uppercase text-white mb-5 border-b border-[#2A2A2A] pb-3">Payment Instructions</h3>
          <div className="flex items-start bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 mb-5 shadow-inner">
            <Trophy className="w-6 h-6 text-primary shrink-0 mr-4 mt-1" />
            <div>
              <p className="text-sm font-sans text-muted-foreground uppercase tracking-wide font-semibold mb-1">Entry Fee</p>
              <p className="font-sans text-2xl text-white font-bold">{tournament.entryFee === 0 ? "FREE" : `${tournament.entryFee.toLocaleString()} AMD`}</p>
            </div>
          </div>
          <div className="prose prose-invert max-w-none font-sans text-[#DDDDDD] text-[15px] whitespace-pre-line bg-[#1A1A1A] p-6 border border-[#2A2A2A] rounded-xl leading-relaxed">
            {tournament.paymentInstructions}
          </div>
        </div>

        <RegistrationForm 
          tournamentId={tournament.id} 
          maxPlayers={tournament.game.maxPlayersPerTeam}
        />
      </div>
    </div>
  );
}
