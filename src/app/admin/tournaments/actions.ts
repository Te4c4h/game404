"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const tournamentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  gameId: z.string().min(1, "Game is required"),
  description: z.string().min(1, "Description is required"),
  rules: z.string().min(1, "Rules are required"),
  maxTeams: z.number().int().min(2),
  entryFee: z.number().int().min(0),
  prizePool: z.number().int().min(0),
  prizeDistribution: z.string().min(1, "Prize distribution is required"),
  paymentInstructions: z.string().min(1, "Payment instructions are required"),
  registrationDeadline: z.string().min(1),
  startDate: z.string().min(1),
  status: z.enum(["DRAFT", "OPEN", "ONGOING", "COMPLETED"]),
});

export async function saveTournament(payload: any) {
  const session = await requireAuth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  const data = tournamentSchema.parse(payload);
  const registrationDeadline = new Date(data.registrationDeadline);
  const startDate = new Date(data.startDate);

  if (data.id) {
    await prisma.tournament.update({
      where: { id: data.id },
      data: {
        name: data.name,
        gameId: data.gameId,
        description: data.description,
        rules: data.rules,
        maxTeams: data.maxTeams,
        entryFee: data.entryFee,
        prizePool: data.prizePool,
        prizeDistribution: data.prizeDistribution,
        paymentInstructions: data.paymentInstructions,
        registrationDeadline,
        startDate,
        status: data.status,
      }
    });
  } else {
    await prisma.tournament.create({
      data: {
        name: data.name,
        gameId: data.gameId,
        description: data.description,
        rules: data.rules,
        maxTeams: data.maxTeams,
        entryFee: data.entryFee,
        prizePool: data.prizePool,
        prizeDistribution: data.prizeDistribution,
        paymentInstructions: data.paymentInstructions,
        registrationDeadline,
        startDate,
        status: data.status,
      }
    });
  }

  revalidatePath("/admin/tournaments");
}

export async function deleteTournament(id: string) {
  const session = await requireAuth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.tournament.delete({ where: { id } });
  revalidatePath("/admin/tournaments");
}
