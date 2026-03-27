import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Link from "next/link";
import { Calendar, Users, Trophy, Banknote, Clock } from "lucide-react";
import { TournamentBracket } from "@/components/tournaments/TournamentBracket";

export const dynamic = "force-dynamic";

export default async function TournamentDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const tournament = await prisma.tournament.findUnique({
    where: { id: params.id },
    include: {
      game: true,
      _count: { select: { registrations: true } },
      registrations: {
        where: { paymentStatus: "APPROVED" },
        include: { user: { select: { name: true } } }
      },
      matches: true
    }
  });

  if (!tournament || tournament.status === "DRAFT") notFound();

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden flex items-end">
        <img src={tournament.game.imageUrl} alt={tournament.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 pb-12 w-full max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="mb-4"><StatusBadge status={tournament.status} /></div>
              <h1 className="font-heading text-4xl md:text-[56px] font-extrabold uppercase tracking-wide text-white leading-tight mb-4">
                {tournament.name}
              </h1>
              <p className="font-sans text-xl text-primary font-bold flex items-center bg-primary/10 inline-flex px-5 py-2.5 rounded-xl border border-primary/20">
                <Trophy className="w-5 h-5 mr-3 text-primary" />
                {tournament.prizePool.toLocaleString()} AMD Prize Pool
              </p>
            </div>
            {tournament.status === "OPEN" && tournament._count.registrations < tournament.maxTeams && (
              <Link href={`/tournaments/${tournament.id}/register`} className="bg-primary text-[#0A0A0A] font-sans font-bold px-8 py-4 rounded-xl hover:bg-[#00CC6A] text-center transition-all transform hover:scale-[1.05] shadow-[0_0_20px_rgba(0,255,135,0.3)] whitespace-nowrap">
                Register Team
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-[#111111] p-8 md:p-10 rounded-2xl border border-[#2A2A2A] shadow-xl">
              <h2 className="font-heading text-[28px] font-bold uppercase text-white mb-6 flex items-center">
                <span className="w-1.5 h-6 bg-primary mr-3 rounded-full"></span>
                Overview & Description
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-muted-foreground leading-relaxed">
                <p className="whitespace-pre-line">{tournament.description}</p>
              </div>
            </section>
            
            <section className="bg-[#111111] p-8 md:p-10 rounded-2xl border border-[#2A2A2A] shadow-xl">
              <h2 className="font-heading text-[28px] font-bold uppercase text-white mb-6 flex items-center">
                <span className="w-1.5 h-6 bg-primary mr-3 rounded-full"></span>
                Tournament Rules
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-muted-foreground bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A2A] leading-relaxed">
                <p className="whitespace-pre-line">{tournament.rules}</p>
              </div>
            </section>
            
            {(tournament.status === "ONGOING" || tournament.status === "COMPLETED") && (
              <section className="bg-[#111111] p-8 md:p-10 rounded-2xl border border-[#2A2A2A] shadow-xl">
                <h2 className="font-heading text-[28px] font-bold uppercase text-white mb-6 flex items-center">
                  <span className="w-1.5 h-6 bg-primary mr-3 rounded-full"></span>
                  Approved Teams
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tournament.registrations.map((reg: any) => (
                    <div key={reg.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-sans font-bold text-white leading-tight">{reg.teamName}</p>
                        <p className="font-sans font-medium text-xs text-muted-foreground mt-1">Capt: {reg.user.name}</p>
                      </div>
                    </div>
                  ))}
                  {tournament.registrations.length === 0 && (
                    <p className="text-muted-foreground font-sans col-span-2">No approved teams yet.</p>
                  )}
                </div>
              </section>
            )}
            
            {(tournament.status === "ONGOING" || tournament.status === "COMPLETED") && tournament.matches.length > 0 && (
              <section className="bg-[#111111] p-8 md:p-10 rounded-2xl border border-[#2A2A2A] shadow-xl overflow-hidden mt-12">
                <h2 className="font-heading text-[28px] font-bold uppercase text-white mb-6 flex items-center">
                  <span className="w-1.5 h-6 bg-primary mr-3 rounded-full"></span>
                  Tournament Bracket
                </h2>
                <div className="-mx-4 md:-mx-8 px-4 md:px-8">
                  <TournamentBracket matches={tournament.matches} registrations={tournament.registrations} />
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 shadow-xl sticky top-24">
              <h3 className="font-heading text-xl font-bold uppercase text-white mb-6 border-b border-[#2A2A2A] pb-4">Details</h3>
              <ul className="space-y-5 font-sans">
                <li className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center font-medium"><Calendar className="w-4 h-4 mr-3" /> Start Date</span>
                  <span className="text-white font-semibold">{new Date(tournament.startDate).toLocaleDateString()}</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center font-medium"><Clock className="w-4 h-4 mr-3" /> Registration Ends</span>
                  <span className="text-white font-semibold">{new Date(tournament.registrationDeadline).toLocaleDateString()}</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center font-medium"><Users className="w-4 h-4 mr-3" /> Spots</span>
                  <span className="text-white font-semibold">{tournament._count.registrations} / {tournament.maxTeams}</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center font-medium"><Banknote className="w-4 h-4 mr-3" /> Entry Fee</span>
                  <span className="text-white font-semibold">{tournament.entryFee === 0 ? "FREE" : `${tournament.entryFee.toLocaleString()} AMD`}</span>
                </li>
                <li className="flex flex-col text-sm pt-4 border-t border-[#2A2A2A] mt-2">
                  <span className="text-muted-foreground mb-3 flex items-center font-medium"><Trophy className="w-4 h-4 mr-3" /> Prize Distribution</span>
                  <span className="text-white bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] text-center tracking-wide">{tournament.prizeDistribution}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
