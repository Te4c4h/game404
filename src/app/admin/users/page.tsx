import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UserTableClient } from "./UserTableClient";

export default async function AdminUsersPage() {
  const session = await requireAuth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/login");

  const users = await prisma.user.findMany({
    where: { role: "CAPTAIN" },
    include: {
      registrations: { select: { id: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">
          Users
        </h1>
      </div>
      <UserTableClient users={users} />
    </div>
  );
}
