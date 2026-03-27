"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { GameModal } from "@/components/admin/GameModal";
import { deleteGame } from "./actions";
import { Edit, Trash2 } from "lucide-react";

export function GameTableClient({ games }: { games: any[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<any>(null);

  const columns = [
    { key: "image", label: "Game Image" },
    { key: "name", label: "Game Name" },
    { key: "tournaments", label: "Active Tournaments" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-white">Games</h1>
        <button
          onClick={() => {
            setEditingGame(null);
            setModalOpen(true);
          }}
          className="bg-primary text-[#0A0A0A] font-semibold px-6 py-2 rounded-[8px] hover:bg-[#00CC6A] transition-all transform hover:scale-[1.02] active:scale-[0.98] font-sans"
        >
          Add New Game
        </button>
      </div>

      <DataTable
        columns={columns}
        data={games}
        renderRow={(game) => {
          const activeTournaments = game.tournaments.filter((t: any) => t.status !== "COMPLETED" && t.status !== "DRAFT").length;
          
          return (
            <>
              <td className="px-4 py-3">
                <img src={game.imageUrl} alt={game.name} className="w-12 h-12 rounded-[8px] object-cover border border-[#2A2A2A]" />
              </td>
              <td className="px-4 py-3 font-sans text-white font-medium">{game.name}</td>
              <td className="px-4 py-3 font-sans text-muted-foreground">{activeTournaments}</td>
              <td className="px-4 py-3 font-sans text-white">
                <span className={`px-3 py-1 rounded-[4px] text-[12px] font-semibold uppercase ${game.status === 'ACTIVE' ? 'bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]' : 'bg-[#888888]/20 text-[#888888] border border-[#888888]'}`}>
                  {game.status}
                </span>
              </td>
              <td className="px-4 py-3 font-sans flex items-center space-x-2">
                <button
                  onClick={() => {
                    setEditingGame(game);
                    setModalOpen(true);
                  }}
                  className="p-2 bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-[8px] text-[#CCCCCC] hover:border-[#00FF87] hover:text-[#00FF87] transition-all flex items-center justify-center w-9 h-9"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={async () => {
                    if (activeTournaments > 0) {
                      alert("Cannot delete a game with active tournaments.");
                      return;
                    }
                    if (confirm("Are you sure you want to delete this game?")) {
                      try {
                        await deleteGame(game.id);
                      } catch (e: any) {
                        alert(e.message);
                      }
                    }
                  }}
                  className={`p-2 bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-[8px] transition-all flex items-center justify-center w-9 h-9 ${
                    activeTournaments > 0 
                      ? "opacity-50 cursor-not-allowed text-[#3A3A3A]" 
                      : "text-[#CCCCCC] hover:border-[#FF3B3B] hover:text-[#FF3B3B]"
                  }`}
                  disabled={activeTournaments > 0}
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </>
          );
        }}
      />

      {modalOpen && (
        <GameModal
          isOpen={modalOpen}
          initialData={editingGame}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
