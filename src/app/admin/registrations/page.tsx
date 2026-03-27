import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { RegistrationTableClient } from "./RegistrationTableClient";

export default async function AdminRegistrationsPage() {
  const session = await requireAuth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/login");

  const registrations = await prisma.registration.findMany({
    include: {
      tournament: { select: { name: true } },
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <RegistrationTableClient registrations={registrations} />
    </div>
  );
}
