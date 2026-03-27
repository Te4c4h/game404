import Link from "next/link";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Calendar, Users } from "lucide-react";

interface TournamentCardProps {
  id: string;
  name: string;
  status: any;
  gameName: string;
  gameImageUrl: string;
  prizePool: number;
  entryFee: number;
  registeredTeams: number;
  maxTeams: number;
  startDate: Date;
}

export function TournamentCard({ id, name, status, gameName, gameImageUrl, prizePool, entryFee, registeredTeams, maxTeams, startDate }: TournamentCardProps) {
  return (
    <Link href={`/tournaments/${id}`} className="group block bg-[#111111] border-[1.5px] border-[#2A2A2A] rounded-[16px] overflow-hidden hover:border-primary transition-all duration-300 shadow-xl hover:shadow-primary/10">
      <div className="h-40 relative overflow-hidden bg-[#1A1A1A]">
        <img src={gameImageUrl} alt={gameName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent" />
        <div className="absolute top-4 right-4"><StatusBadge status={status} /></div>
      </div>
      <div className="p-5 sm:p-6 -mt-10 relative z-10">
        <h3 className="font-heading text-[26px] leading-[1.1] font-bold uppercase text-white tracking-wide mb-2 group-hover:text-primary transition-colors line-clamp-2" title={name}>{name}</h3>
        <p className="text-sm font-sans text-muted-foreground mb-6 font-medium bg-[#1A1A1A] inline-block px-3 py-1 rounded-full border border-[#2A2A2A]">{gameName}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
            <p className="text-xs text-muted-foreground font-sans mb-1 uppercase tracking-wider font-semibold">Prize Pool</p>
            <p className="font-mono text-primary font-bold text-lg leading-none">{prizePool.toLocaleString()} AMD</p>
          </div>
          <div className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A]">
            <p className="text-xs text-muted-foreground font-sans mb-1 uppercase tracking-wider font-semibold">Entry Fee</p>
            <p className="font-mono text-white font-bold text-lg leading-none">{entryFee === 0 ? "FREE" : `${entryFee.toLocaleString()} AMD`}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground font-sans pt-5 border-t border-[#2A2A2A]">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span className="font-medium text-white">{registeredTeams}</span><span className="mx-1">/</span><span>{maxTeams} Teams</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="font-medium text-white">{new Date(startDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
