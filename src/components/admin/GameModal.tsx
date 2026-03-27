"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { saveGame } from "@/app/admin/games/actions";
import { useRouter } from "next/navigation";

export function GameModal({ isOpen, onClose, initialData }: any) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [maxPlayers, setMaxPlayers] = useState(initialData?.maxPlayersPerTeam || 5);
  const [status, setStatus] = useState(initialData?.status || "ACTIVE");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

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
      setImageUrl(data.url);
    } catch (err: any) {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      await saveGame({ 
        id: initialData?.id, 
        name, 
        imageUrl, 
        maxPlayersPerTeam: Number(maxPlayers), 
        status 
      });
      router.refresh();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[4px] p-4">
      <div className="bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-[16px] w-full max-w-lg p-6 shadow-2xl relative">
        <h2 className="text-[24px] font-heading tracking-wide font-semibold text-white mb-6">
          {initialData ? "Edit Game" : "Add New Game"}
        </h2>

        {error && <div className="mb-4 text-sm text-[#FF3B3B] bg-[#FF3B3B]/10 p-3 rounded-[8px] border border-[#FF3B3B]">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-sans font-medium text-white">Game Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. CS2, Valorant"
              required
              className="w-full bg-[#111111] border-[1.5px] border-[#2A2A2A] rounded-[8px] px-4 py-3 text-white outline-none focus:border-[#00FF87] font-sans"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-sans font-medium text-white">Game Image</label>
            <div className="flex items-center space-x-4">
              {imageUrl && <img src={imageUrl} alt="Preview" className="w-16 h-16 rounded-[8px] object-cover border border-[#2A2A2A]" />}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="text-sm font-sans text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-[8px] file:border-0 file:font-semibold file:bg-[#2A2A2A] file:text-white hover:file:bg-[#3A3A3A] transition-colors cursor-pointer"
              />
              {isUploading && <Loader2 className="w-5 h-5 animate-spin text-[#00FF87]" />}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-sans font-medium text-white">Max Players per Team</label>
            <input
              type="number"
              min="1"
              max="10"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(e.target.value)}
              required
              className="w-full bg-[#111111] border-[1.5px] border-[#2A2A2A] rounded-[8px] px-4 py-3 text-white outline-none focus:border-[#00FF87] font-sans"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-sans font-medium text-white">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#111111] border-[1.5px] border-[#2A2A2A] rounded-[8px] px-4 py-3 text-white outline-none focus:border-[#00FF87] font-sans"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-[#2A2A2A]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-6 py-2 rounded-[8px] font-sans font-semibold text-[#CCCCCC] bg-transparent border-[1.5px] border-[#2A2A2A] hover:text-white hover:border-[#888888] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isUploading || !imageUrl}
              className="flex items-center px-6 py-2 rounded-[8px] font-sans font-semibold text-[#0A0A0A] bg-[#00FF87] hover:bg-[#00CC6A] disabled:opacity-50 transition-all"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              Save Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
