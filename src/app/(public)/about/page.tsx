export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-background flex items-center py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-heading text-4xl md:text-[56px] font-extrabold uppercase tracking-wide text-white mb-8 text-center md:text-left">
          About GAME<span className="text-primary">404</span>
        </h1>
        
        <div className="prose prose-invert max-w-none font-sans text-lg text-white/80 space-y-6 bg-[#111111]/80 backdrop-blur-sm p-8 md:p-12 rounded-[16px] border border-[#2A2A2A] shadow-2xl leading-relaxed">
          <p>
            Game404 was founded in 2026 to elevate the Armenian esports scene. We provide a professional platform for teams to compete, track their progress, and win exact prize pools.
          </p>
          <p>
            Driven by a passion for competitive gaming, our goal is to streamline tournament organization and create a structured environment where players can shine on the national stage. Whether you are an amateur squad looking to make a name for yourself or seasoned veterans, Game404 offers fair play, transparent rules, and an unmatched competitive atmosphere.
          </p>
          <div className="mt-8 pt-8 border-t border-[#2A2A2A] flex justify-center md:justify-start">
            <span className="font-mono text-primary bg-primary/10 px-4 py-2 rounded-lg text-sm border border-primary/20">System Status: OPERATIONAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
