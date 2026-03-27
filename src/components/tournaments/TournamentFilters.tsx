"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function TournamentFilters({ games }: { games: { id: string, name: string }[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(name, value);
      else params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-10 bg-[#111111] p-4 rounded-[16px] border-[1.5px] border-[#2A2A2A] shadow-xl">
      <div className="flex-1">
        <label className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Filter by Game</label>
        <select 
          value={searchParams.get("game") || ""} 
          onChange={(e) => router.push(`?${createQueryString("game", e.target.value)}`)}
          className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm font-sans font-medium text-white focus:border-primary outline-none transition-colors appearance-none"
        >
          <option value="">All Games</option>
          {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>
      
      <div className="flex-1">
        <label className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Filter by Status</label>
        <select 
          value={searchParams.get("status") || ""} 
          onChange={(e) => router.push(`?${createQueryString("status", e.target.value)}`)}
          className="w-full bg-[#1A1A1A] border-[1.5px] border-[#2A2A2A] rounded-lg px-4 py-3 text-sm font-sans font-medium text-white focus:border-primary outline-none transition-colors appearance-none"
        >
          <option value="">All Statuses</option>
          <option value="OPEN">Open</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
    </div>
  );
}
