"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";

interface Player {
  nickname: string;
  discord: string;
}

export function RegistrationForm({ tournamentId, maxPlayers }: { tournamentId: string, maxPlayers: number }) {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  // Start with exactly maxPlayers rows if they are fixed, but letting them add up to max is fine
  const [players, setPlayers] = useState<Player[]>(Array.from({ length: maxPlayers }, () => ({ nickname: "", discord: "" })));
  const [paymentProofUrl, setPaymentProofUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      setPaymentProofUrl(data.url);
    } catch (err: any) {
      setError("Payment proof upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  function updatePlayer(index: number, field: keyof Player, value: string) {
    const newPlayers = [...players];
    newPlayers[index][field] = value;
    setPlayers(newPlayers);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!paymentProofUrl) {
      setError("Please upload a payment proof receipt.");
      return;
    }

    if (players.length !== maxPlayers) {
      setError(`You must register exactly ${maxPlayers} players for this game.`);
      return;
    }

    // Ensure all player fields are filled
    for (const p of players) {
      if (!p.nickname.trim() || !p.discord.trim()) {
        setError("All player fields must be filled out.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/tournaments/${tournamentId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, players, paymentProofUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      router.push("/dashboard?registered=true");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#111111] p-6 lg:p-8 rounded-[16px] border border-[#2A2A2A] shadow-2xl mt-8">
      <h2 className="font-heading text-[22px] tracking-wide font-bold uppercase text-white mb-6 border-b border-[#2A2A2A] pb-3">Team Details</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-[#FF3B3B]/10 border border-[#FF3B3B] rounded-xl text-[#FF3B3B] text-sm font-semibold">
          {error}
        </div>
      )}

      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-sm font-sans font-medium text-white block">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter your team name"
            required
            className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-xl px-5 py-3 text-white focus:border-primary outline-none transition-colors font-sans"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
            <label className="text-sm font-sans font-medium text-white block">
              Players ({maxPlayers}/{maxPlayers} Required)
            </label>
          </div>
          
          <div className="space-y-4">
            {players.map((player, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-4 items-start bg-[#1A1A1A] p-5 rounded-xl border border-[#2A2A2A] relative hover:border-primary/50 transition-colors">
                <div className="flex flex-col items-center justify-center bg-[#111111] rounded-lg w-10 h-10 border border-[#2A2A2A] shrink-0 sm:mt-[22px]">
                  <span className="font-mono text-white text-sm font-bold">{idx + 1}</span>
                </div>
                <div className="flex-1 w-full space-y-2">
                  <label className="text-xs font-sans text-muted-foreground uppercase font-semibold tracking-wide block">In-game Nickname</label>
                  <input
                    type="text"
                    value={player.nickname}
                    onChange={(e) => updatePlayer(idx, "nickname", e.target.value)}
                    placeholder="Game ID"
                    required
                    className="w-full bg-[#111111] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="flex-1 w-full space-y-2">
                  <label className="text-xs font-sans text-muted-foreground uppercase font-semibold tracking-wide block">Tracker / Social</label>
                  <input
                    type="text"
                    value={player.discord}
                    onChange={(e) => updatePlayer(idx, "discord", e.target.value)}
                    placeholder="Discord ID or URL"
                    required
                    className="w-full bg-[#111111] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-6 border-t border-[#2A2A2A]">
          <label className="text-sm font-sans font-medium text-white block">Upload Payment Proof</label>
          <div className="bg-[#1A1A1A] border-[1.5px] border-dashed border-[#3A3A3A] rounded-xl p-8 text-center hover:border-primary/50 transition-colors relative group shadow-inner">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {isUploading ? (
              <div className="flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm font-sans text-muted-foreground">Uploading receipt securely...</p>
              </div>
            ) : paymentProofUrl ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30 mb-2">
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <p className="text-[15px] font-sans text-white font-medium">Receipt uploaded successfully!</p>
                <p className="text-xs font-sans text-muted-foreground bg-[#111111] px-3 py-1 rounded-full border border-[#2A2A2A] mt-2">Click to replace</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-14 h-14 bg-[#212121] rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-2">
                  <Upload className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-[15px] font-sans text-white font-medium">Click or drag file to upload</p>
                <p className="text-xs font-sans text-muted-foreground mt-1">JPEG, PNG, or PDF formats</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-[#2A2A2A]">
        <button
          type="submit"
          disabled={isSubmitting || isUploading || !paymentProofUrl || players.length !== maxPlayers}
          className="w-full bg-primary text-[#0A0A0A] font-sans font-bold text-lg py-4 rounded-xl hover:bg-[#00CC6A] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(0,255,135,0.2)]"
        >
          {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Registration"}
        </button>
        <p className="text-xs text-center text-muted-foreground font-sans mt-5">
          By submitting this form, you automatically agree to the tournament's official ruleset.
        </p>
      </div>
    </form>
  );
}
