import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, Gamepad2, Trophy, ClipboardList } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await requireAuth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/login");

  const [usersCount, gamesCount, tournamentsCount, pendingRegsCount] = await Promise.all([
    prisma.user.count({ where: { role: "CAPTAIN" } }),
    prisma.game.count(),
    prisma.tournament.count(),
    prisma.registration.count({ where: { paymentStatus: "PENDING" } })
  ]);

  const stats = [
    { label: "Captains", value: usersCount, icon: Users, href: "/admin/users", color: "text-[#3B82F6]" },
    { label: "Games", value: gamesCount, icon: Gamepad2, href: "/admin/games", color: "text-[#B900FF]" },
    { label: "Tournaments", value: tournamentsCount, icon: Trophy, href: "/admin/tournaments", color: "text-[#FFB800]" },
    { label: "Pending Approvals", value: pendingRegsCount, icon: ClipboardList, href: "/admin/registrations", color: "text-primary" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-[40px] font-extrabold uppercase tracking-wide text-white leading-tight">Administration</h1>
        <p className="text-muted-foreground font-sans text-lg mt-1">Platform metrics and operational status</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href} className="bg-[#111111] p-6 rounded-[16px] border-[1.5px] border-[#2A2A2A] hover:border-primary/50 transition-all shadow-xl group hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-sans font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <div className={`p-2.5 bg-[#1A1A1A] rounded-[10px] border border-[#2A2A2A] group-hover:bg-primary/5 transition-colors`}>
                  <Icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
                </div>
              </div>
              <p className="font-mono text-4xl font-bold text-white tracking-tight">{stat.value.toLocaleString()}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
