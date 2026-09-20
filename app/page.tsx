import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import HeroTradingVisual from "@/components/HeroTradingVisual";
import TrustStrip from "@/components/TrustStrip";
import MarketTicker from "@/components/MarketTicker";
import AccountMarketplace from "@/components/AccountMarketplace";
import RulesMatrix from "@/components/RulesMatrix";
import HowItWorks from "@/components/HowItWorks";
import FAQSection from "@/components/FAQSection";
import { ArrowRight, ShieldCheck, Zap, Sparkles, Crown, Award, ChevronRight } from "lucide-react";

export const revalidate = 0;

export default async function HomePage() {
  const rawProducts = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const products = rawProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    accountSize: p.accountSize,
    priceUSD: p.priceUSD,
    dailyDrawdown: p.dailyDrawdown,
    maxDrawdown: p.maxDrawdown,
    leverage: p.leverage,
    profitTarget: p.profitTarget,
    tradingPeriod: p.tradingPeriod,
    minTradingDays: p.minTradingDays,
    rewardSplit: p.rewardSplit,
    weekendHolding: p.weekendHolding,
    newsTrading: p.newsTrading,
    eaTrading: p.eaTrading,
    isFeatured: p.isFeatured,
  }));

  return (
    <div className="relative overflow-hidden bg-[#030405]">
      {/* Live High-Frequency Market Ticker */}
      <MarketTicker />

      {/* HERO SECTION WITH LUXURY WALLPAPER BACKDROP */}
      <section className="relative luxury-hero-backdrop pt-12 pb-24 md:pt-20 md:pb-36 border-b border-white/[0.08]">
        {/* Dark Vignette Overlay to ensure razor-sharp typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-transparent to-black/40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-6 text-center lg:text-left">
              {/* Luxury Institutional Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#080D11]/90 border border-amber-500/30 text-xs text-zinc-200 mb-8 shadow-[0_4px_25px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="font-extrabold text-white tracking-widest uppercase text-[10px]">
                  Institutional Capital Desk
                </span>
                <span className="text-zinc-600">•</span>
                <span className="gold-text-gradient font-black tracking-widest text-[10px]">
                  TRADE • GROW • FREEDOM
                </span>
              </div>

              {/* Main Headline with Gold & Platinum Gradient */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06]">
                Trade Bigger. <br />
                <span className="gold-text-gradient">Prove Your Edge.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Access up to <strong className="text-white font-semibold">$200,000 in simulated proprietary liquidity</strong>. Execute with institutional precision, transparent drawdown boundaries, and instant non-custodial crypto checkout.
              </p>

              {/* Simulated Notice */}
              <div className="mt-3 text-xs text-zinc-400 font-medium">
                * Simulated evaluation environment with zero personal trading capital risk.
              </div>

              {/* Hero Action CTAs */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="#accounts"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-9 py-4 rounded-xl luxury-gold-button font-black text-xs uppercase tracking-wider transition-all duration-300 group"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Explore Accounts</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-black" />
                </Link>

                <Link
                  href="#how-it-works"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0B0F13]/90 hover:bg-[#151D24] text-white font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-white/20 transition-all shadow-xl backdrop-blur-xl"
                >
                  <span>How It Works</span>
                </Link>
              </div>

              {/* Wealth & Metrics Showcase */}
              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-center lg:text-left">
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">
                    $200K
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mt-0.5">
                    Max Capital Tier
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono block">
                    90%
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mt-0.5">
                    Simulated Reward Split
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">
                    1:100
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mt-0.5">
                    Account Leverage
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual (Luxury Trading Terminal) */}
            <div className="lg:col-span-6 w-full">
              <HeroTradingVisual />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* ACCOUNT MARKETPLACE WITH LUXURY METALLIC STYLING */}
      <div className="luxury-wallpaper-bg">
        <AccountMarketplace products={products} />
      </div>

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* RULES MATRIX */}
      <RulesMatrix />

      {/* FAQ SECTION */}
      <FAQSection />

      {/* LUXURY VIP CONVERSION BANNER */}
      <section className="py-24 relative border-t border-white/10 luxury-ribbons-backdrop">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="p-10 sm:p-16 rounded-3xl bg-[#080C10]/95 border border-amber-500/30 shadow-[0_25px_90px_rgba(0,0,0,0.95)] backdrop-blur-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Elite Evaluation Fast-Track
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to Prove Your Trading Edge?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Select your simulated account size, pay easily with non-custodial cryptocurrency, and receive your credentials directly to your FundedFlex portal.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/accounts"
                className="w-full sm:w-auto px-10 py-4 rounded-xl luxury-gold-button text-black font-black text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all"
              >
                Browse All 6 Account Sizes →
              </Link>
              <Link
                href="/rules"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors"
              >
                Review Trading Rules
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
