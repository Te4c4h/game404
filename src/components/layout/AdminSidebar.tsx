"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Gamepad2, 
  Trophy, 
  ClipboardList, 
  Network, 
  Users, 
  LogOut 
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/games", label: "Games", icon: Gamepad2 },
  { href: "/admin/tournaments", label: "Tournaments", icon: Trophy },
  { href: "/admin/registrations", label: "Registrations", icon: ClipboardList },
  { href: "/admin/users", label: "Users", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[80px] md:w-[64px] lg:w-[240px] shrink-0 min-h-screen border-r border-border bg-[#111111] flex flex-col transition-all">
      <div className="h-[64px] flex items-center justify-center border-b border-border">
        <Link href="/admin" className="font-heading font-extrabold text-[24px] uppercase tracking-wide truncate">
          <span className="text-white hidden lg:inline">GAME</span>
          <span className="text-primary hidden lg:inline">404</span>
          <span className="text-white lg:hidden">G</span>
          <span className="text-primary lg:hidden">4</span>
        </Link>
      </div>
      
      <nav className="flex-1 py-6 px-3 flex flex-col space-y-2">
        {navItems.map((item) => {
          // Exact match for /admin, prefix match for others
          const isActive = item.href === "/admin" 
            ? pathname === "/admin" 
            : pathname?.startsWith(item.href);
            
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-3 rounded-md font-sans transition-colors group",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
              <span className="hidden lg:inline whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="w-full flex items-center space-x-3 px-3 py-3 rounded-md font-sans text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors group">
          <LogOut className="h-5 w-5 shrink-0 group-hover:text-destructive" />
          <span className="hidden lg:inline whitespace-nowrap">Logout</span>
        </button>
      </div>
    </aside>
  );
}
