import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[#0A0A0A] bg-[radial-gradient(ellipse_at_top_left,_#00FF8710_0%,_transparent_60%)] min-h-[560px] flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 z-10 text-center md:text-left">
          <h1 className="font-heading font-extrabold text-[40px] md:text-[56px] text-white leading-tight uppercase">
            Armenia's #1 Esports Arena
          </h1>
          <p className="font-sans text-xl text-muted-foreground mt-4 max-w-2xl">
            Register your team, compete in tournaments, and claim your prize.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/tournaments" className="bg-primary text-[#0A0A0A] font-semibold px-6 py-3 rounded-[8px] hover:bg-[#00CC6A] text-center transition-all inline-block hover:scale-[1.02]">
              Browse Tournaments
            </Link>
            <Link href="/register" className="bg-transparent border-[1.5px] border-primary text-primary font-semibold px-6 py-3 rounded-[8px] text-center hover:bg-primary/10 transition-all inline-block">
              Register Your Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
