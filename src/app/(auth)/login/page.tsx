"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// Google OAuth Login Page

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

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
      setError(res.error === "CredentialsSignin" ? "Invalid email or password" : res.error);
      setIsLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card border-[1.5px] border-border rounded-xl p-6 lg:p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <Link href="/">
            <motion.h1 
              whileHover={{ scale: 1.02 }}
              className="font-heading font-extrabold text-[32px] uppercase text-white tracking-wide mb-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              GAME<span className="text-primary">404</span>
            </motion.h1>
          </Link>
          <h2 className="font-heading text-[24px] font-semibold text-white">Welcome Back</h2>
          <p className="text-muted-foreground font-sans mt-1">Login to your Game404 account</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 bg-red-500/10 border border-destructive rounded-[8px] text-destructive text-sm font-sans font-medium text-center"
          >
            {error}
          </motion.div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white text-[#0A0A0A] font-semibold py-3 rounded-[8px] hover:bg-gray-100 transition-all flex justify-center items-center gap-2 mb-4 disabled:opacity-70"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

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

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-[#0A0A0A] font-semibold py-3 rounded-[8px] hover:bg-[#00CC6A] transition-all font-sans flex justify-center items-center disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
            Don&apos;t have an account? Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
