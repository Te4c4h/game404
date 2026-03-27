"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      isAdminLogin: "true",
    });

    if (res?.error) {
      setError("Invalid credentials.");
      setIsLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border-[1.5px] border-border rounded-xl p-6 lg:p-8 shadow-2xl">
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="font-heading font-extrabold text-[32px] uppercase text-white tracking-wide mb-2 hover:opacity-80 transition-opacity">
              GAME<span className="text-primary">404</span>
            </h1>
          </Link>
          <h2 className="font-heading text-[24px] font-semibold text-white">Admin Panel</h2>
          <p className="text-muted-foreground font-sans mt-1">Game404 Administration</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-destructive rounded-[8px] text-destructive text-sm font-sans font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-sans font-medium text-white block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1A1A1A] border-[1.5px] border-border rounded-[8px] px-4 py-3 text-white focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all font-sans text-sm"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-sans font-medium text-white block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1A1A1A] border-[1.5px] border-border rounded-[8px] px-4 py-3 text-white focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all font-sans text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-primary text-[#0A0A0A] font-semibold py-3 rounded-[8px] hover:bg-[#00CC6A] transition-all transform hover:scale-[1.02] active:scale-[0.98] font-sans flex justify-center items-center disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
