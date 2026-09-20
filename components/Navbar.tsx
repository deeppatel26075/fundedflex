"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";
import { Menu, X, ArrowRight, ShieldCheck, User as UserIcon, LayoutDashboard, Sparkles } from "lucide-react";

interface NavbarProps {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Accounts", href: "/accounts" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Rules", href: "/rules" },
    { label: "FAQ", href: "/#faq" },
    { label: "About", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#030507]/92 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <BrandLogo withTagline size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#090D10]/85 px-5 py-2 rounded-full border border-white/10 backdrop-blur-xl shadow-lg">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                    isActive
                      ? "text-white bg-white/10 shadow-sm"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#00FFA3] bg-[#00E599]/15 border border-[#00E599]/30 hover:bg-amber-500/25 transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-zinc-800/90 hover:bg-zinc-700 border border-white/10 transition-colors shadow-md"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#00E599]" />
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/accounts"
                  className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider luxury-gold-button transition-all duration-300"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Funded</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <Link
                href="/dashboard"
                className="p-2 rounded-lg bg-zinc-800/80 text-[#00E599] border border-white/10"
              >
                <LayoutDashboard className="w-4 h-4" />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[68px] p-4 bg-[#05080A]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all">
          <div className="flex flex-col gap-2 pt-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-zinc-200 hover:text-[#00FFA3] hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-zinc-800 text-white font-bold text-xs uppercase border border-white/10"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#00E599]" />
                    Trader Dashboard
                  </Link>
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#00E599]/15 text-[#00FFA3] border border-[#00E599]/30 font-bold text-xs uppercase"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Admin Operations
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-200 font-bold text-xs uppercase"
                  >
                    Login
                  </Link>
                  <Link
                    href="/accounts"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl luxury-gold-button text-black font-extrabold text-xs uppercase tracking-wider"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Get Funded</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
