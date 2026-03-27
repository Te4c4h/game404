import Link from "next/link";
import prisma from "@/lib/prisma";
import { motion } from "framer-motion";
import { Trophy, Gamepad2, Users, Calendar, ChevronRight } from "lucide-react";
import { GameCard } from "@/components/games/GameCard";
import { TournamentCard } from "@/components/tournaments/TournamentCard";

export const revalidate = 60;

async function getFeaturedGames() {
  return prisma.game.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    take: 4,
  });
}

async function getFeaturedTournaments() {
  return prisma.tournament.findMany({
    where: { status: { in: ["OPEN", "ONGOING"] } },
    include: { game: true },
    orderBy: { startDate: "asc" },
    take: 4,
  });
}

async function getStats() {
  const [gamesCount, tournamentsCount, usersCount] = await Promise.all([
    prisma.game.count({ where: { status: "ACTIVE" } }),
    prisma.tournament.count({ where: { status: { in: ["OPEN", "ONGOING"] } } }),
    prisma.user.count({ where: { role: "CAPTAIN" } }),
  ]);
  return { gamesCount, tournamentsCount, usersCount };
}

export default async function HomePage() {
  const [games, tournaments, stats] = await Promise.all([
    getFeaturedGames(),
    getFeaturedTournaments(),
    getStats(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#0A0A0A] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#00FF8715_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#00FF8710_0%,_transparent_50%)]" />
        
        <motion.div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full opacity-40"
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div className="absolute top-40 right-20 w-3 h-3 bg-primary rounded-full opacity-30"
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="font-heading font-extrabold text-[40px] md:text-[56px] lg:text-[72px] text-white leading-tight uppercase"
            >
              Armenia&apos;s #1<br /><span className="text-primary">Esports Arena</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-xl md:text-2xl text-muted-foreground mt-6 max-w-2xl mx-auto"
            >
              Register your team, compete in tournaments, and claim your prize.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/tournaments" className="group bg-primary text-[#0A0A0A] font-semibold px-8 py-4 rounded-[8px] hover:bg-[#00CC6A] transition-all inline-flex items-center justify-center gap-2 hover:scale-[1.02]">
                <Trophy className="h-5 w-5" />
                Browse Tournaments
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/register" className="group bg-transparent border-[1.5px] border-primary text-primary font-semibold px-8 py-4 rounded-[8px] hover:bg-primary/10 transition-all inline-flex items-center justify-center gap-2">
                <Users className="h-5 w-5" />
                Register Your Team
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#111111] py-12 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center p-6">
              <Gamepad2 className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="font-heading text-[36px] font-bold text-white">{stats.gamesCount}</div>
              <div className="text-muted-foreground font-sans">Active Games</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center p-6">
              <Trophy className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="font-heading text-[36px] font-bold text-white">{stats.tournamentsCount}</div>
              <div className="text-muted-foreground font-sans">Active Tournaments</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center p-6">
              <Users className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="font-heading text-[36px] font-bold text-white">{stats.usersCount}</div>
              <div className="text-muted-foreground font-sans">Team Captains</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-heading text-[32px] font-bold text-white">Featured Games</h2>
              <p className="text-muted-foreground font-sans mt-1">Compete in your favorite games</p>
            </div>
            <Link href="/games" className="text-primary hover:text-[#00CC6A] transition-colors font-sans font-medium flex items-center gap-1 group">
              View All<ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {games.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {games.map((game, index) => (
                <motion.div key={game.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <GameCard id={game.id} name={game.name} imageUrl={game.imageUrl} activeCount={0} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">No active games at the moment. Check back soon!</div>
          )}
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-heading text-[32px] font-bold text-white">Active Tournaments</h2>
              <p className="text-muted-foreground font-sans mt-1">Join now and compete for prizes</p>
            </div>
            <Link href="/tournaments" className="text-primary hover:text-[#00CC6A] transition-colors font-sans font-medium flex items-center gap-1 group">
              View All<ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {tournaments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tournaments.map((tournament, index) => (
                <motion.div key={tournament.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <TournamentCard
                    id={tournament.id}
                    name={tournament.name}
                    status={tournament.status}
                    gameName={tournament.game.name}
                    gameImageUrl={tournament.game.imageUrl}
                    prizePool={tournament.prizePool}
                    entryFee={tournament.entryFee}
                    registeredTeams={0}
                    maxTeams={tournament.maxTeams}
                    startDate={tournament.startDate}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No active tournaments at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
