import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL or DIRECT_URL not set");
}

const prisma = new PrismaClient({
  datasourceUrl: databaseUrl,
});

async function main() {
  const games = [
    { name: "CS2", imageUrl: "https://res.cloudinary.com/diqjszxyr/image/upload/v1/game404/games/cs2.jpg", maxPlayersPerTeam: 5, status: "ACTIVE" as const },
    { name: "Mobile Legends", imageUrl: "https://res.cloudinary.com/diqjszxyr/image/upload/v1/game404/games/mobile-legends.jpg", maxPlayersPerTeam: 5, status: "ACTIVE" as const },
    { name: "Rocket League", imageUrl: "https://res.cloudinary.com/diqjszxyr/image/upload/v1/game404/games/rocket-league.jpg", maxPlayersPerTeam: 3, status: "ACTIVE" as const },
  ];

  for (const game of games) {
    const existing = await prisma.game.findFirst({ where: { name: game.name } });
    if (!existing) {
      await prisma.game.create({ data: game });
      console.log(`✅ Created: ${game.name}`);
    } else {
      console.log(`⏭️  Skipped: ${game.name} (already exists)`);
    }
  }
}

main()
  .catch((e) => { console.error("❌ Seed error:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
