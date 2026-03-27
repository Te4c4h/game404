"use client";

import { DataTable } from "@/components/admin/DataTable";
import { deleteTournament } from "./actions";
import { Edit, Trash2, Settings } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";

export function TournamentTableClient({ tournaments }: { tournaments: any[] }) {
  if (!tournaments.length) {
    return (
      <EmptyState
        title="No Tournaments Found"
        description="Get started by creating your first tournament."
        action={
          <Link href="/admin/tournaments/create" className="bg-primary text-[#0A0A0A] font-semibold px-6 py-2.5 rounded-[8px] hover:bg-[#00CC6A] transition-all transform hover:scale-[1.02] inline-block font-sans mt-4">
            Create Tournament
          </Link>
        }
      />
    );
  }

  const columns = [
    { key: "name", label: "Tournament" },
    { key: "game", label: "Game" },
    { key: "teams", label: "Teams" },
    { key: "prize", label: "Prize Pool" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <DataTable
      columns={columns}
      data={tournaments}
      renderRow={(t) => (
        <>
          <td className="px-4 py-4 font-sans text-white font-medium max-w-[200px] truncate" title={t.name}>{t.name}</td>
          <td className="px-4 py-4 font-sans text-muted-foreground">{t.game.name}</td>
          <td className="px-4 py-4 font-sans text-muted-foreground">
            {t._count.registrations} / <span className="text-white">{t.maxTeams}</span>
          </td>
          <td className="px-4 py-4 font-sans text-white">{t.prizePool.toLocaleString()} AMD</td>
          <td className="px-4 py-4">
            <StatusBadge status={t.status} />
          </td>
          <td className="px-4 py-4 font-sans flex items-center space-x-2">
            <Link
              href={`/admin/tournaments/${t.id}/edit`}
              className="p-2 bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-[8px] text-[#CCCCCC] hover:border-[#00FF87] hover:text-[#00FF87] transition-all flex items-center justify-center w-9 h-9"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </Link>
            <Link
              href={`/admin/tournaments/${t.id}/bracket`}
              className="p-2 bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-[8px] text-[#CCCCCC] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all flex items-center justify-center w-9 h-9"
              title="Manage Bracket"
            >
              <Settings className="w-4 h-4" />
            </Link>
            <button
              onClick={async () => {
                if (t._count.registrations > 0) {
                  alert("Cannot delete a tournament that has registered teams.");
                  return;
                }
                if (confirm("Are you sure you want to delete this tournament?")) {
                  try {
                    await deleteTournament(t.id);
                  } catch (e: any) {
                    alert(e.message);
                  }
                }
              }}
              className={`p-2 bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-[8px] transition-all flex items-center justify-center w-9 h-9 ${
                t._count.registrations > 0 
                  ? "opacity-50 cursor-not-allowed text-[#3A3A3A]" 
                  : "text-[#CCCCCC] hover:border-[#FF3B3B] hover:text-[#FF3B3B]"
              }`}
              disabled={t._count.registrations > 0}
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </td>
        </>
      )}
    />
  );
}
