"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveTournament } from "@/app/admin/tournaments/actions";
import { Loader2 } from "lucide-react";

export function TournamentForm({
  initialData,
  games
}: {
  initialData?: any;
  games: { id: string; name: string }[];
}) {
  const router = useRouter();

  function formatDateTimeLocal(date?: Date) {
    if (!date) return "";
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  }

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    gameId: initialData?.gameId || "",
    description: initialData?.description || "",
    rules: initialData?.rules || "",
    maxTeams: initialData?.maxTeams || 16,
    entryFee: initialData?.entryFee || 0,
    prizePool: initialData?.prizePool || 0,
    prizeDistribution: initialData?.prizeDistribution || "",
    registrationDeadline: formatDateTimeLocal(initialData?.registrationDeadline),
    startDate: formatDateTimeLocal(initialData?.startDate),
    paymentInstructions: initialData?.paymentInstructions || "",
    status: initialData?.status || "DRAFT"
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      await saveTournament({
        ...formData,
        id: initialData?.id,
        maxTeams: Number(formData.maxTeams),
        entryFee: Number(formData.entryFee),
        prizePool: Number(formData.prizePool),
      });
      router.push("/admin/tournaments");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#111111] p-6 lg:p-8 rounded-xl border border-[#2A2A2A] space-y-6 shadow-xl">
      {error && <div className="p-4 bg-[#FF3B3B]/10 text-[#FF3B3B] border border-[#FF3B3B] rounded-lg text-sm font-semibold">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-sans font-medium text-white">Tournament Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required placeholder="Enter tournament name" className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none transition-colors" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-sans font-medium text-white">Game</label>
          <select name="gameId" value={formData.gameId} onChange={handleChange} required className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none transition-colors appearance-none">
            <option value="">Select a game</option>
            {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-sans font-medium text-white">Description & Rules</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none transition-colors" placeholder="Enter tournament description..." />
          <textarea name="rules" value={formData.rules} onChange={handleChange} required rows={3} className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none transition-colors mt-4" placeholder="Enter tournament rules..." />
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-sans font-medium text-white">Max Teams</label>
            <select name="maxTeams" value={formData.maxTeams} onChange={handleChange} required className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none transition-colors">
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-sans font-medium text-white">Entry Fee (AMD)</label>
            <input type="number" name="entryFee" value={formData.entryFee} onChange={handleChange} min="0" required placeholder="e.g. 5000" className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none transition-colors" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-sans font-medium text-white">Total Prize Pool (AMD)</label>
            <input type="number" name="prizePool" value={formData.prizePool} onChange={handleChange} min="0" required className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none transition-colors" />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-sans font-medium text-white">Prize Distribution</label>
          <input name="prizeDistribution" value={formData.prizeDistribution} onChange={handleChange} required className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none transition-colors" placeholder="e.g. 1st place: 70%, 2nd place: 30%" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-sans font-medium text-white">Registration Deadline</label>
          <input type="datetime-local" name="registrationDeadline" value={formData.registrationDeadline} onChange={handleChange} required className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none transition-colors appearance-none" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-sans font-medium text-white">Tournament Start Date</label>
          <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none transition-colors appearance-none" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-sans font-medium text-white">Payment Instructions</label>
          <textarea name="paymentInstructions" value={formData.paymentInstructions} onChange={handleChange} required rows={3} className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none transition-colors" placeholder="Enter bank transfer details and instructions for teams..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-sans font-medium text-white">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} required className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-white focus:border-primary outline-none transition-colors appearance-none">
            <option value="DRAFT">Draft</option>
            <option value="OPEN">Open</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-8 mt-8 border-t border-[#2A2A2A]">
        <button type="button" onClick={() => router.back()} disabled={isSaving} className="px-6 py-2.5 text-sm font-sans font-semibold text-[#CCCCCC] bg-transparent border-[1.5px] border-[#2A2A2A] rounded-lg hover:text-white hover:border-[#888888] transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={isSaving} className="flex items-center justify-center bg-primary text-[#0A0A0A] font-sans font-semibold px-6 py-2.5 rounded-lg hover:bg-[#00CC6A] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100">
          {isSaving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          {initialData ? "Save Tournament" : "Create Tournament"}
        </button>
      </div>
    </form>
  );
}
