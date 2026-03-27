"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const initialStatus = useMemo(() => token ? "loading" : "error", [token]);
  const initialMessage = useMemo(() => token ? "" : "Missing verification token", [token]);
  
  const [status, setStatus] = useState<"loading" | "success" | "error">(initialStatus);
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    if (!token) return;

    fetch(`/api/verify-email?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage("Your email has been verified! You can now log in.");
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card border-[1.5px] border-border rounded-xl p-6 lg:p-8 shadow-2xl text-center"
      >
        <Link href="/">
          <h1 className="font-heading font-extrabold text-[32px] uppercase text-white tracking-wide mb-6 hover:opacity-80 transition-opacity">
            GAME<span className="text-primary">404</span>
          </h1>
        </Link>

        {status === "loading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-muted-foreground font-sans">Verifying your email...</p>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <CheckCircle className="h-16 w-16 text-primary" />
            <h2 className="font-heading text-[24px] font-semibold text-white">Email Verified!</h2>
            <p className="text-muted-foreground font-sans">{message}</p>
            <Link 
              href="/login"
              className="mt-4 bg-primary text-[#0A0A0A] font-semibold px-8 py-3 rounded-[8px] hover:bg-[#00CC6A] transition-all hover:scale-[1.02]"
            >
              Go to Login
            </Link>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <XCircle className="h-16 w-16 text-destructive" />
            <h2 className="font-heading text-[24px] font-semibold text-white">Verification Failed</h2>
            <p className="text-muted-foreground font-sans">{message}</p>
            <Link 
              href="/register"
              className="mt-4 bg-transparent border-[1.5px] border-primary text-primary font-semibold px-8 py-3 rounded-[8px] hover:bg-primary/10 transition-all"
            >
              Back to Register
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
