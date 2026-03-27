"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";

const toggleSchema = z.object({
  userId: z.string(),
  currentStatus: z.enum(["ACTIVE", "BANNED"]),
});

export async function toggleUserStatus(payload: { userId: string; currentStatus: "ACTIVE" | "BANNED" }) {
  const session = await requireAuth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  const { userId, currentStatus } = toggleSchema.parse(payload);
  const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
  
  await prisma.user.update({
    where: { id: userId },
    data: { status: newStatus }
  });
  
  revalidatePath("/admin/users");
}
