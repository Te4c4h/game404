"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
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
    });

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
    } else {
      router.push("/dashboard");
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
          <h2 className="font-heading text-[24px] font-semibold text-white">Welcome Back</h2>
          <p className="text-muted-foreground font-sans mt-1">Login to your Game404 account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-destructive rounded-[8px] text-destructive text-sm font-sans font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-sans font-medium text-white block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full bg-[#1A1A1A] border-[1.5px] border-border rounded-[8px] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all font-sans text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-sans font-medium text-white block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full bg-[#1A1A1A] border-[1.5px] border-border rounded-[8px] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all font-sans text-sm"
            />
          </div>

          <div className="flex justify-end">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-[#0A0A0A] font-semibold py-3 rounded-[8px] hover:bg-[#00CC6A] transition-all transform hover:scale-[1.02] active:scale-[0.98] font-sans flex justify-center items-center disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
