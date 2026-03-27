"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TournamentBracket } from "@/components/tournaments/TournamentBracket";
import { Loader2 } from "lucide-react";

export function BracketClient({ tournamentId, matches, registrations }: { tournamentId: string, matches: any[], registrations: any[] }) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  
  // Modal states
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [winnerId, setWinnerId] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const teamsMap = registrations.reduce((acc, curr) => {
    acc[curr.id] = curr.teamName;
    return acc;
  }, {} as Record<string, string>);

  async function generateBracket() {
    setIsGenerating(true);
    try {
      const res = await fetch(`/api/tournaments/${tournamentId}/bracket`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Failed to generate bracket");
    } finally {
      setIsGenerating(false);
    }
  }

  function openMatchEditor(match: any) {
    if (match.locked) return; 
    setSelectedMatch(match);
    setScore1(match.score1 || 0);
    setScore2(match.score2 || 0);
    setWinnerId(match.winnerId || "");
  }

  async function updateMatch(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(`/api/matches/${selectedMatch.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score1, score2, winnerId: winnerId || null })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      setSelectedMatch(null);
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold uppercase text-white">Bracket Context</h2>
        {matches.length === 0 && (
          <button
            onClick={generateBracket}
            disabled={isGenerating}
            className="bg-primary text-[#0A0A0A] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#00CC6A] transition-all flex items-center shadow-[0_0_15px_rgba(0,255,135,0.2)]"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Generate Bracket"}
          </button>
        )}
      </div>

      {matches.length === 0 ? (
        <div className="bg-[#1A1A1A] border-[1.5px] border-dashed border-[#2A2A2A] rounded-xl p-16 text-center shadow-inner">
          <p className="text-white font-sans text-lg mb-2 font-medium">No bracket generated yet.</p>
          <p className="text-muted-foreground font-sans">You have {registrations.length} approved teams. Generating the bracket will randomize initial placements.</p>
        </div>
      ) : (
        <div className="bg-[#111111] p-6 lg:p-8 rounded-xl border border-[#2A2A2A] overflow-hidden shadow-2xl relative">
          <div className="absolute top-6 right-6 flex items-center space-x-3 text-xs text-muted-foreground font-sans">
            <div className="flex items-center"><span className="w-3 h-3 bg-primary/20 border border-primary text-primary rounded-[2px] mr-1.5 inline-block"></span> Winner</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-[#1A1A1A] border border-[#00FF87]/50 rounded-[2px] mr-1.5 inline-block"></span> Locked</div>
          </div>
          <TournamentBracket matches={matches} registrations={registrations} onMatchClick={openMatchEditor} />
        </div>
      )}

      {selectedMatch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
            <h3 className="text-2xl font-heading font-bold text-white mb-8 text-center uppercase tracking-wide">Update Match Result</h3>
            
            <form onSubmit={updateMatch} className="space-y-6">
              <div className="flex items-center justify-between gap-4 bg-[#111111] p-6 rounded-xl border border-[#2A2A2A]">
                <div className="flex-1 flex flex-col items-center">
                  <p className="text-sm font-bold text-white mb-3 truncate w-full text-center" title={teamsMap[selectedMatch.team1Id]}>{teamsMap[selectedMatch.team1Id]}</p>
                  <input type="number" value={score1} onChange={e => setScore1(Number(e.target.value))} className="w-20 lg:w-24 bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-3 py-2.5 text-center text-xl font-mono text-white focus:border-primary outline-none transition-colors" min="0" />
                </div>
                <div className="text-muted-foreground font-heading italic text-xl">VS</div>
                <div className="flex-1 flex flex-col items-center">
                  <p className="text-sm font-bold text-white mb-3 truncate w-full text-center" title={teamsMap[selectedMatch.team2Id]}>{teamsMap[selectedMatch.team2Id]}</p>
                  <input type="number" value={score2} onChange={e => setScore2(Number(e.target.value))} className="w-20 lg:w-24 bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-3 py-2.5 text-center text-xl font-mono text-white focus:border-primary outline-none transition-colors" min="0" />
                </div>
              </div>

              <div className="space-y-3 mt-6 pt-6 border-t border-[#2A2A2A]">
                <label className="text-sm font-sans font-semibold text-white block uppercase tracking-wider">Declare Winner</label>
                <select value={winnerId} onChange={e => setWinnerId(e.target.value)} className="w-full bg-[#111111] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3.5 text-sm font-medium text-white focus:border-primary outline-none transition-colors appearance-none">
                  <option value="">-- Match Ongoing --</option>
                  <option value={selectedMatch.team1Id}>{teamsMap[selectedMatch.team1Id]}</option>
                  <option value={selectedMatch.team2Id}>{teamsMap[selectedMatch.team2Id]}</option>
                </select>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Declaring a winner will permanently close this match and automatically seat the victorious team in the next bracket round.</p>
              </div>

              <div className="flex justify-end space-x-3 pt-6 mt-2">
                <button type="button" onClick={() => setSelectedMatch(null)} disabled={isSaving} className="px-5 py-2.5 rounded-lg font-sans font-semibold text-[#CCCCCC] bg-transparent border border-[#2A2A2A] hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="flex items-center px-5 py-2.5 rounded-lg font-sans font-semibold text-[#0A0A0A] bg-primary hover:bg-[#00CC6A] disabled:opacity-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Outcome"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
