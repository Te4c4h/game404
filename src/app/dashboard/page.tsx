import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default async function DashboardPage() {
  const session = await requireAuth();
  if (!session || session.user.role !== "CAPTAIN") redirect("/login");

  const registrations = await prisma.registration.findMany({
    where: { userId: session.user.id },
    include: {
      tournament: {
        include: { game: { select: { name: true } } }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background flex flex-col pt-16 pb-24">
      <div className="container mx-auto px-4 max-w-5xl flex-1">
        <div className="mb-10 text-center md:text-left">
          <h1 className="font-heading text-4xl md:text-[48px] font-extrabold uppercase tracking-wide text-white">
            Captain Dashboard
          </h1>
          <p className="font-sans text-xl text-muted-foreground mt-3">
            Welcome back, <span className="text-white font-semibold">{session.user.name}</span>. Track your tournament registrations below.
          </p>
        </div>

        <div className="bg-[#111111] border border-[#2A2A2A] rounded-[16px] p-6 sm:p-8 shadow-2xl">
          <h2 className="font-heading text-2xl font-bold uppercase text-white mb-6 border-b border-[#2A2A2A] pb-4">
            My Teams & Registrations
          </h2>

          {registrations.length === 0 ? (
            <div className="text-center py-16 border-[1.5px] border-dashed border-[#2A2A2A] rounded-xl bg-[#1A1A1A]">
              <p className="text-muted-foreground font-sans text-lg mb-6">You haven't registered for any tournaments yet.</p>
              <Link href="/tournaments" className="bg-primary text-[#0A0A0A] font-sans font-bold px-8 py-3 rounded-lg hover:bg-[#00CC6A] transition-all inline-block hover:scale-[1.02]">
                Browse Tournaments
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {registrations.map(reg => (
                <div key={reg.id} className="bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-[12px] p-5 lg:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-primary/50 transition-colors">
                  <div className="flex-1 w-full">
                    <h3 className="font-heading text-2xl font-bold uppercase text-white mb-2">{reg.teamName}</h3>
                    <p className="font-sans text-sm text-muted-foreground font-semibold mb-3">
                      {reg.tournament.name} • <span className="text-white">{reg.tournament.game.name}</span>
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground font-sans font-medium bg-[#111111] inline-flex px-3 py-1.5 rounded-md border border-[#2A2A2A]">
                      <Calendar className="w-3.5 h-3.5 mr-2 text-primary" />
                      Starts {new Date(reg.tournament.startDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 border-[#2A2A2A] pt-4 md:pt-0">
                    <StatusBadge status={reg.paymentStatus} className="mb-1" />
                    <Link href={`/tournaments/${reg.tournament.id}`} className="text-sm font-sans font-bold text-[#00FF87] hover:text-[#00CC6A] transition-colors underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
                      View Tournament Context
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
