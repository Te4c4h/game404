import prisma from "@/lib/prisma";
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { TournamentFilters } from "@/components/tournaments/TournamentFilters";

export default async function TournamentsPage({ searchParams }: { searchParams: { game?: string; status?: string } }) {
  const whereClause: any = { status: { not: "DRAFT" } };
  
  if (searchParams.game) whereClause.gameId = searchParams.game;
  if (searchParams.status) whereClause.status = searchParams.status;

  const tournaments = await prisma.tournament.findMany({
    where: whereClause,
    include: {
      game: { select: { name: true, imageUrl: true } },
      _count: { select: { registrations: true } }
    },
    orderBy: { startDate: "asc" }
  });

  const games = await prisma.game.findMany({
    where: { status: "ACTIVE" },
    select: { id: true, name: true },
    orderBy: { name: "asc" }
  });

  return (
    <div className="min-h-screen bg-background py-16 relative">
      <div className="absolute top-0 right-0 w-full h-96 bg-[radial-gradient(ellipse_at_top_right,_#00FF8708_0%,_transparent_50%)] pointer-events-none" />
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="mb-12 text-center md:text-left">
          <h1 className="font-heading text-4xl md:text-[56px] font-extrabold uppercase tracking-wide text-white leading-tight">
            Tournaments
          </h1>
          <p className="font-sans text-xl text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Find active and upcoming tournaments to compete in.
          </p>
        </div>

        <TournamentFilters games={games} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {tournaments.map(t => (
            <TournamentCard 
              key={t.id}
              id={t.id}
              name={t.name}
              status={t.status}
              gameName={t.game.name}
              gameImageUrl={t.game.imageUrl}
              prizePool={t.prizePool}
              entryFee={t.entryFee}
              registeredTeams={t._count.registrations}
              maxTeams={t.maxTeams}
              startDate={t.startDate}
            />
          ))}
        </div>

        {tournaments.length === 0 && (
          <div className="text-center py-24 border-[1.5px] border-dashed border-[#2A2A2A] rounded-[16px] bg-[#111111]">
            <p className="text-muted-foreground font-sans text-lg">No tournaments found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
