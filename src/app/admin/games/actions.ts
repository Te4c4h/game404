"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const gameSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Valid image URL required"),
  maxPlayersPerTeam: z.number().min(1).max(10),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export async function saveGame(payload: any) {
  const session = await requireAuth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  const data = gameSchema.parse(payload);

  if (data.id) {
    await prisma.game.update({
      where: { id: data.id },
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        maxPlayersPerTeam: data.maxPlayersPerTeam,
        status: data.status,
      }
    });
  } else {
    await prisma.game.create({
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        maxPlayersPerTeam: data.maxPlayersPerTeam,
        status: data.status,
      }
    });
  }

  revalidatePath("/admin/games");
}

export async function deleteGame(id: string) {
  const session = await requireAuth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  const game = await prisma.game.findUnique({
    where: { id },
    include: { _count: { select: { tournaments: { where: { status: { not: "DRAFT" } } } } } }
  });

  if (!game) throw new Error("Game not found");
  if (game._count.tournaments > 0) {
    throw new Error("Cannot delete a game with active tournaments.");
  }

  await prisma.game.delete({ where: { id } });
  revalidatePath("/admin/games");
}
