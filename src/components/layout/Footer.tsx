import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center space-y-6">
        <Link href="/" className="font-heading font-extrabold text-[24px] uppercase tracking-wide">
          <span className="text-white">GAME</span><span className="text-primary">404</span>
        </Link>
        <p className="text-muted-foreground font-sans">
          Where Armenian Esports Compete
        </p>
        <nav className="flex space-x-6 font-sans">
          <Link href="/tournaments" className="text-muted-foreground hover:text-primary transition-colors">
            Tournaments
          </Link>
          <Link href="/games" className="text-muted-foreground hover:text-primary transition-colors">
            Games
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/admin/login" className="text-muted-foreground hover:text-primary transition-colors">
            Admin
          </Link>
        </nav>
        <p className="font-sans text-xs text-muted-foreground/60">
          © 2026 Game404. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
