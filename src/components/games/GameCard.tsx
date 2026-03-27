import Link from "next/link";

interface GameCardProps {
  id: string;
  name: string;
  imageUrl: string | null | undefined;
  activeCount: number;
}

export function GameCard({ id, name, imageUrl, activeCount }: GameCardProps) {
  const imageSrc = imageUrl || "";
  return (
    <div className="group relative rounded-[16px] overflow-hidden border-[1.5px] border-[#2A2A2A] bg-[#111111] hover:border-primary transition-all duration-300 shadow-xl hover:shadow-primary/10">
      <div className="w-full aspect-square relative overflow-hidden bg-[#1A1A1A]">
        <img src={imageSrc} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
      </div>
      <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-end">
        <h3 className="font-heading text-2xl sm:text-[28px] leading-none font-bold text-white tracking-wide uppercase group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-sm font-sans text-muted-foreground mt-2 font-medium">
          {activeCount === 1 ? "1 active tournament" : `${activeCount} active tournaments`}
        </p>
        
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <Link href={`/tournaments?game=${id}`} className="bg-primary text-[#0A0A0A] p-3 rounded-[8px] flex items-center justify-center hover:bg-[#00CC6A] hover:scale-105 active:scale-95 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
