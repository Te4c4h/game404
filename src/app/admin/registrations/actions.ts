"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";

export async function updateRegistrationStatus(id: string, status: "APPROVED" | "REJECTED") {
  const session = await requireAuth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.registration.update({
    where: { id },
    data: { paymentStatus: status }
  });

  revalidatePath("/admin/registrations");
  revalidatePath("/tournaments/[id]", "page");
}
