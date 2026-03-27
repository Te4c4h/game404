import prisma from "@/lib/prisma";
import { GameCard } from "@/components/games/GameCard";

export default async function GamesPage() {
  const games = await prisma.game.findMany({
    where: { status: "ACTIVE" },
    include: {
      tournaments: {
        where: { status: { in: ["OPEN", "ONGOING"] } }
      }
    },
    orderBy: { name: "asc" }
  });

  return (
    <div className="min-h-screen bg-background py-16 relative">
      <div className="absolute top-0 right-0 w-full h-96 bg-[radial-gradient(ellipse_at_top_right,_#00FF8708_0%,_transparent_50%)] pointer-events-none" />
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="mb-12 text-center md:text-left">
          <h1 className="font-heading text-4xl md:text-[56px] font-extrabold uppercase tracking-wide text-white leading-tight">Supported Games</h1>
          <p className="font-sans text-xl text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Choose your battlefield. Game404 hosts tournaments for the most popular competitive titles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map(game => (
            <GameCard 
              key={game.id} 
              id={game.id} 
              name={game.name} 
              imageUrl={game.imageUrl} 
              activeCount={game.tournaments.length} 
            />
          ))}
        </div>
        
        {games.length === 0 && (
          <div className="text-center py-24 border-[1.5px] border-dashed border-[#2A2A2A] rounded-[16px] bg-[#111111]">
            <p className="text-muted-foreground font-sans text-lg">No active games available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
