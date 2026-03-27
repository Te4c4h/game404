import Link from "next/link";
import prisma from "@/lib/prisma";
import { motion } from "framer-motion";
import { Trophy, Gamepad2, Users, Calendar, ChevronRight, Zap, Target, Medal, ArrowRight } from "lucide-react";
import { GameCard } from "@/components/games/GameCard";
import { TournamentCard } from "@/components/tournaments/TournamentCard";

export const revalidate = 60;

async function getFeaturedGames() {
  try {
    return await prisma.game.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
  } catch {
    return [];
  }
}

async function getFeaturedTournaments() {
  try {
    return await prisma.tournament.findMany({
      where: { status: { in: ["OPEN", "ONGOING"] } },
      include: { game: true },
      orderBy: { startDate: "asc" },
      take: 4,
    });
  } catch {
    return [];
  }
}

async function getCompletedTournaments() {
  try {
    return await prisma.tournament.findMany({
      where: { status: "COMPLETED" },
      include: { game: true },
      orderBy: { startDate: "desc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

async function getStats() {
  try {
    const [gamesCount, tournamentsCount, usersCount, completedCount] = await Promise.all([
      prisma.game.count({ where: { status: "ACTIVE" } }),
      prisma.tournament.count({ where: { status: { in: ["OPEN", "ONGOING"] } } }),
      prisma.user.count({ where: { role: "CAPTAIN" } }),
      prisma.tournament.count({ where: { status: "COMPLETED" } }),
    ]);
    return { gamesCount, tournamentsCount, usersCount, completedCount };
  } catch {
    return { gamesCount: 0, tournamentsCount: 0, usersCount: 0, completedCount: 0 };
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default async function HomePage() {
  const [games, tournaments, completedTournaments, stats] = await Promise.all([
    getFeaturedGames(),
    getFeaturedTournaments(),
    getCompletedTournaments(),
    getStats(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#0A0A0A] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#00FF8715_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#00FF8710_0%,transparent_50%)]" />
        
        <motion.div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full opacity-40"
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div className="absolute top-40 right-20 w-3 h-3 bg-primary rounded-full opacity-30"
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.div className="absolute bottom-40 left-1/4 w-2 h-2 bg-primary rounded-full opacity-50"
          animate={{ y: [0, -15, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        />

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-heading font-extrabold text-[40px] md:text-[56px] lg:text-[72px] text-white leading-tight uppercase">
                Armenia&apos;s #1<br /><span className="text-primary">Esports Arena</span>
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-xl md:text-2xl text-muted-foreground mt-6 max-w-2xl mx-auto"
            >
              Register your team, compete in tournaments, and claim your prize.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                href="#tournaments" 
                className="group bg-primary text-[#0A0A0A] font-semibold px-8 py-4 rounded-[8px] hover:bg-[#00CC6A] transition-all inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Trophy className="h-5 w-5" />
                Browse Tournaments
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/register" 
                className="group bg-transparent border-[1.5px] border-primary text-primary font-semibold px-8 py-4 rounded-[8px] hover:bg-primary/10 transition-all inline-flex items-center justify-center gap-2"
              >
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
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <motion.div variants={itemVariants} className="text-center p-6 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A]">
              <Gamepad2 className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="font-heading text-[32px] md:text-[36px] font-bold text-white">{stats.gamesCount}</div>
              <div className="text-muted-foreground font-sans text-sm">Active Games</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center p-6 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A]">
              <Trophy className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="font-heading text-[32px] md:text-[36px] font-bold text-white">{stats.tournamentsCount}</div>
              <div className="text-muted-foreground font-sans text-sm">Live Tournaments</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center p-6 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A]">
              <Users className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="font-heading text-[32px] md:text-[36px] font-bold text-white">{stats.usersCount}</div>
              <div className="text-muted-foreground font-sans text-sm">Team Captains</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center p-6 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A]">
              <Medal className="h-10 w-10 text-primary mx-auto mb-3" />
              <div className="font-heading text-[32px] md:text-[36px] font-bold text-white">{stats.completedCount}</div>
              <div className="text-muted-foreground font-sans text-sm">Completed Events</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live & Open Tournaments */}
      <section id="tournaments" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-heading text-[28px] md:text-[32px] font-bold text-white flex items-center gap-3"
              >
                <Zap className="h-8 w-8 text-primary" />
                Live & Open Tournaments
              </motion.h2>
              <p className="text-muted-foreground font-sans mt-1">Register your team and compete for prizes</p>
            </div>
          </div>

          {tournaments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tournaments.map((tournament, index) => (
                <motion.div 
                  key={tournament.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }}
                >
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
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-16 bg-[#111111] rounded-xl border border-[#2A2A2A]"
            >
              <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground text-lg">No active tournaments right now.</p>
              <p className="text-muted-foreground mt-2">Check back soon for upcoming events!</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Games We Play */}
      <section id="games" className="py-20 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-heading text-[28px] md:text-[32px] font-bold text-white flex items-center gap-3"
              >
                <Gamepad2 className="h-8 w-8 text-primary" />
                Games We Play
              </motion.h2>
              <p className="text-muted-foreground font-sans mt-1">Compete in your favorite titles on Game404</p>
            </div>
          </div>

          {games.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {games.map((game, index) => (
                <motion.div 
                  key={game.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }}
                >
                  <GameCard id={game.id} name={game.name} imageUrl={game.imageUrl} activeCount={0} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-16 bg-[#0A0A0A] rounded-xl border border-[#2A2A2A]"
            >
              <Gamepad2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground text-lg">No active games at the moment.</p>
              <p className="text-muted-foreground mt-2">Our game lineup is being updated!</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-[28px] md:text-[32px] font-bold text-white">How It Works</h2>
            <p className="text-muted-foreground font-sans mt-2">Get started in three simple steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="relative"
            >
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 h-full hover:border-primary/50 transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center font-heading font-bold text-[#0A0A0A]">1</div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">Create Your Account</h3>
                <p className="text-muted-foreground font-sans">Sign up as a team captain and set up your profile in seconds.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 h-full hover:border-primary/50 transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center font-heading font-bold text-[#0A0A0A]">2</div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">Join a Tournament</h3>
                <p className="text-muted-foreground font-sans">Browse open tournaments, register your team, and complete your entry fee payment.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 h-full hover:border-primary/50 transition-all group">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                  <Trophy className="h-7 w-7 text-primary" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center font-heading font-bold text-[#0A0A0A]">3</div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">Compete & Win</h3>
                <p className="text-muted-foreground font-sans">Play your matches, track results on the live bracket, and take home the prize.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Results */}
      {completedTournaments.length > 0 && (
        <section className="py-20 bg-[#111111]">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-heading text-[28px] md:text-[32px] font-bold text-white flex items-center justify-center gap-3">
                <Medal className="h-8 w-8 text-primary" />
                Recent Results
              </h2>
              <p className="text-muted-foreground font-sans mt-2">Latest completed tournaments on Game404</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {completedTournaments.map((tournament, index) => (
                <motion.div 
                  key={tournament.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {tournament.game.name}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-white mt-2">{tournament.name}</h3>
                    </div>
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Prize: <span className="text-white font-medium">{tournament.prizePool.toLocaleString()} AMD</span>
                    </span>
                    <Link 
                      href={`/tournaments/${tournament.id}`}
                      className="text-primary hover:text-[#00CC6A] font-medium flex items-center gap-1"
                    >
                      View <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#00FF8715_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-[28px] md:text-[36px] font-bold text-white mb-4">
              Ready to Compete?
            </h2>
            <p className="text-muted-foreground font-sans text-lg mb-8 max-w-xl mx-auto">
              Join hundreds of Armenian gamers competing for glory and prizes. Register your team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register" 
                className="bg-primary text-[#0A0A0A] font-semibold px-8 py-4 rounded-[8px] hover:bg-[#00CC6A] transition-all inline-flex items-center justify-center gap-2"
              >
                <Users className="h-5 w-5" />
                Create Free Account
              </Link>
              <Link 
                href="#tournaments" 
                className="bg-transparent border-[1.5px] border-white/30 text-white font-semibold px-8 py-4 rounded-[8px] hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2"
              >
                <Trophy className="h-5 w-5" />
                Browse Tournaments
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
