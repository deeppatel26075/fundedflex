"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.user?.role === "ADMIN" && !searchParams.get("redirect")) {
        router.push("/admin");
      } else {
        router.push(redirectUrl);
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="max-w-md w-full space-y-8 p-8 rounded-3xl bg-[#090D0F] border border-white/10 shadow-2xl relative">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <BrandLogo size="lg" />
        </div>
        <h2 className="text-2xl font-extrabold text-white">
          Access Your Portal
        </h2>
        <p className="text-xs text-zinc-400 mt-2">
          Log in to manage your active simulated accounts, orders, and credentials.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050707] border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#F59E0B] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050707] border border-white/10 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#F59E0B] transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold text-sm shadow-glow-gold-sm transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying credentials...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Demo fast-login badges for immediate verification */}
      <div className="pt-4 border-t border-white/10">
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold block mb-2 text-center">
          One-Click Testing Credentials:
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickFill("trader@fundedflex.com", "TraderFlex2026!")}
            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-zinc-300 border border-white/5 transition-colors text-center"
          >
            Demo Trader
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("admin@fundedflex.com", "AdminFlex2026!")}
            className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[11px] text-amber-300 border border-amber-500/20 transition-colors text-center"
          >
            Operations Admin
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-zinc-400">
        Don&#39;t have an account?{" "}
        <Link href="/register" className="text-[#F59E0B] hover:underline font-semibold">
          Register now
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-zinc-500 text-xs">Loading login form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
