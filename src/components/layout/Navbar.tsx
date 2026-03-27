"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full h-[64px] bg-[#0A0A0A]/95 border-b border-border backdrop-blur-[12px]">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="font-heading font-extrabold text-[28px] uppercase tracking-wide hover:opacity-80 transition-opacity">
          <span className="text-white">GAME</span><span className="text-primary">404</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8 font-sans">
          {isHomePage ? (
            <>
              <button 
                onClick={() => scrollToSection("tournaments")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Tournaments
              </button>
              <button 
                onClick={() => scrollToSection("games")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Games
              </button>
              <button 
                onClick={() => scrollToSection("how-it-works")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </button>
            </>
          ) : (
            <>
              <Link href="/#tournaments" className="text-muted-foreground hover:text-primary transition-colors">
                Tournaments
              </Link>
              <Link href="/#games" className="text-muted-foreground hover:text-primary transition-colors">
                Games
              </Link>
              <Link href="/#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4 font-sans">
          {session ? (
            <>
              <span className="text-white hidden md:inline-block">
                Hey, {session.user?.role === "ADMIN" ? "Admin" : "Captain"}
              </span>
              <Link 
                href={session.user?.role === "ADMIN" ? "/admin" : "/dashboard"} 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {session.user?.role === "ADMIN" ? "Admin Panel" : "My Dashboard"}
              </Link>
              <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-white font-semibold hover:text-primary transition-colors px-4 py-2"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-primary text-[#0A0A0A] font-semibold px-6 py-2 rounded-[8px] hover:bg-[#00CC6A] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
