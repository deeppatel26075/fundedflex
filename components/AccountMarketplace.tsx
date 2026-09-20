"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, Shield, Zap, Award, Crown } from "lucide-react";

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  accountSize: number;
  priceUSD: number;
  dailyDrawdown: number;
  maxDrawdown: number;
  leverage: string;
  profitTarget: number;
  tradingPeriod: string;
  minTradingDays: number;
  rewardSplit: string;
  weekendHolding: boolean;
  newsTrading: boolean;
  eaTrading: boolean;
  isFeatured: boolean;
}

interface AccountMarketplaceProps {
  products: ProductItem[];
  title?: string;
  subtitle?: string;
}

export default function AccountMarketplace({
  products,
  title = "Exclusive Simulated Capital Tiers",
  subtitle = "Select your simulated allocation up to $200,000. Institutional parameters, non-custodial crypto checkout, and up to 90% simulated reward splits.",
}: AccountMarketplaceProps) {
  const sorted = [...products].sort((a, b) => a.accountSize - b.accountSize);
  const [selectedSize, setSelectedSize] = useState<number>(50000); // Default $50K

  const activeProduct =
    sorted.find((p) => p.accountSize === selectedSize) || sorted[0] || null;

  return (
    <section id="accounts" className="py-24 relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-[#00E599]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00E599]/20 to-[#00E599]/10 border border-[#00E599]/40 text-[#00E599] text-xs font-bold uppercase tracking-widest mb-4 shadow-glow-green-sm">
            <Crown className="w-3.5 h-3.5 text-[#00FFA3]" />
            Institutional Portfolio Allocation
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-base text-zinc-400 mt-4 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Segmented Account Size Selector with Gold Highlights */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex flex-wrap items-center justify-center p-2 rounded-2xl bg-[#080D10] border border-white/10 gap-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
            {sorted.map((prod) => {
              const isSelected = prod.accountSize === selectedSize;
              const formattedSize = `$${(prod.accountSize / 1000).toFixed(0)}K`;
              return (
                <button
                  key={prod.id}
                  onClick={() => setSelectedSize(prod.accountSize)}
                  className={`relative px-6 py-3 rounded-xl text-sm font-extrabold transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#00E599] to-[#00E599] text-black shadow-[0_0_20px_rgba(0,229,153,0.5)] scale-[1.03]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {prod.accountSize >= 100000 && (
                    <span className="absolute -top-2.5 right-2 px-1.5 py-0.2 text-[8px] font-black uppercase rounded bg-[#00FFA3] text-black shadow">
                      APEX
                    </span>
                  )}
                  {prod.isFeatured && (
                    <span className="absolute -top-2.5 right-2 px-1.5 py-0.2 text-[8px] font-black uppercase rounded bg-[#00FFA3] text-black shadow">
                      POPULAR
                    </span>
                  )}
                  {formattedSize}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Product Luxury Showcase Card */}
        {activeProduct && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
            {/* Primary Feature Card */}
            <div className="lg:col-span-8 rounded-3xl bg-gradient-to-b from-[#0C1215] to-[#070A0C] border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E599]/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-8">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#00E599]">
                        SIMULATED EVALUATION PROGRAM
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#00FFA3]/10 text-[#00FFA3] border border-amber-400/20">
                        Institutional Grade
                      </span>
                    </div>
                    <h3 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
                      ${activeProduct.accountSize.toLocaleString()}{" "}
                      <span className="text-zinc-400 font-normal text-2xl sm:text-3xl">
                        Account
                      </span>
                    </h3>
                    <p className="text-sm text-zinc-400 mt-2">
                      One-time evaluation fee • Zero monthly subscription fees • Rapid crypto activation
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                      ${activeProduct.priceUSD}
                    </div>
                    <span className="text-xs text-[#00E599] font-bold block mt-1">
                      Direct Crypto Settlement
                    </span>
                  </div>
                </div>

                {/* Rules Grid with Glowing Borders */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00E599]/30 transition-colors">
                    <span className="text-xs text-zinc-400 block font-medium">Daily Loss Limit</span>
                    <span className="text-xl font-bold text-white font-mono mt-1 block">
                      {activeProduct.dailyDrawdown}%
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Max loss: $
                      {((activeProduct.accountSize * activeProduct.dailyDrawdown) / 100).toLocaleString()}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00E599]/30 transition-colors">
                    <span className="text-xs text-zinc-400 block font-medium">Max Drawdown</span>
                    <span className="text-xl font-bold text-white font-mono mt-1 block">
                      {activeProduct.maxDrawdown}%
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Loss ceiling: $
                      {((activeProduct.accountSize * activeProduct.maxDrawdown) / 100).toLocaleString()}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00E599]/30 transition-colors">
                    <span className="text-xs text-zinc-400 block font-medium">Account Leverage</span>
                    <span className="text-xl font-bold text-white font-mono mt-1 block">
                      {activeProduct.leverage}
                    </span>
                    <span className="text-[11px] text-zinc-500">Forex & Metals</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00E599]/30 transition-colors">
                    <span className="text-xs text-zinc-400 block font-medium">Profit Target</span>
                    <span className="text-xl font-bold text-[#00E599] font-mono mt-1 block">
                      {activeProduct.profitTarget}%
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Goal: $
                      {((activeProduct.accountSize * activeProduct.profitTarget) / 100).toLocaleString()}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00E599]/30 transition-colors">
                    <span className="text-xs text-zinc-400 block font-medium">Trading Period</span>
                    <span className="text-xl font-bold text-white font-mono mt-1 block">
                      {activeProduct.tradingPeriod}
                    </span>
                    <span className="text-[11px] text-zinc-500">No time pressure</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/30">
                    <span className="text-xs text-[#00E599] block font-bold uppercase tracking-wider">
                      Simulated Split
                    </span>
                    <span className="text-xl font-extrabold text-[#00E599] font-mono mt-1 block">
                      {activeProduct.rewardSplit}
                    </span>
                    <span className="text-[11px] text-zinc-300">Milestone payout share</span>
                  </div>
                </div>
              </div>

              {/* Perks / Allowed Methods */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Check className="w-4 h-4 text-[#00E599]" />
                    Weekend Holding
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Check className="w-4 h-4 text-[#00E599]" />
                    News Trading
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Check className="w-4 h-4 text-[#00E599]" />
                    EAs & Bots
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href={`/accounts/${activeProduct.slug}`}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors text-center"
                  >
                    View Rule Breakdown
                  </Link>
                  <Link
                    href={`/checkout?plan=${activeProduct.slug}`}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#00E599] hover:bg-[#00c784] text-black text-xs font-extrabold shadow-glow-green-sm transition-all"
                  >
                    <span>Get This Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* High-Roller Summary Card */}
            <div className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-[#10171B] to-[#0A0F12] border border-white/10 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div>
                <div className="flex items-center gap-2 text-white font-extrabold text-lg mb-6">
                  <Crown className="w-5 h-5 text-[#00E599]" />
                  The FundedFlex Advantage
                </div>

                <ul className="space-y-4 text-xs text-zinc-300">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#00E599] mt-1.5 flex-shrink-0 shadow-[0_0_8px_#00E599]" />
                    <span>
                      <strong className="text-white">Strict Static Limits:</strong> Daily loss and maximum drawdown ceilings are calculated against baseline capital.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#00E599] mt-1.5 flex-shrink-0 shadow-[0_0_8px_#00E599]" />
                    <span>
                      <strong className="text-white">Crypto-Only Settlement:</strong> Fast, non-custodial checkout in USDT, USDC, BTC, and ETH.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#00E599] mt-1.5 flex-shrink-0 shadow-[0_0_8px_#00E599]" />
                    <span>
                      <strong className="text-white">Instant Credential Vault:</strong> Automated generation of account ID, username, and encrypted password upon verification.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#00E599] mt-1.5 flex-shrink-0 shadow-[0_0_8px_#00E599]" />
                    <span>
                      <strong className="text-white">Simulated Demo Transparency:</strong> Institutional environment designed for testing trader risk and skill.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href={`/checkout?plan=${activeProduct.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs shadow-xl transition-all"
                >
                  <Zap className="w-4 h-4 text-[#00E599]" />
                  <span>Allocate For ${activeProduct.priceUSD} USD</span>
                </Link>
                <p className="text-[11px] text-zinc-500 text-center mt-2.5">
                  100% simulated evaluation platform
                </p>
              </div>
            </div>
          </div>
        )}

        {/* All Tiers Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((prod) => {
            const isSelected = prod.accountSize === selectedSize;
            return (
              <div
                key={prod.id}
                className={`rounded-3xl p-7 transition-all duration-300 border ${
                  isSelected
                    ? "bg-[#0C1215] border-[#00E599]/50 shadow-[0_0_30px_rgba(0,229,153,0.2)] scale-[1.01]"
                    : "bg-[#070A0C] border-white/10 hover:border-white/20 hover:bg-[#0A0E10]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
                    {prod.name.split(" ")[1] || "Tier"}
                  </span>
                  {prod.accountSize >= 100000 ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#00FFA3]/10 text-[#00E599] border border-amber-400/30">
                      Apex Tier
                    </span>
                  ) : prod.isFeatured ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#00E599]/15 text-[#00E599] border border-[#00E599]/40">
                      Featured
                    </span>
                  ) : null}
                </div>

                <div className="text-3xl font-extrabold text-white tracking-tight">
                  ${prod.accountSize.toLocaleString()}
                </div>
                <div className="text-sm font-bold text-[#00E599] font-mono mt-1">
                  ${prod.priceUSD} USD
                </div>

                <div className="my-5 pt-5 border-t border-white/10 space-y-2.5 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Daily Drawdown:</span>
                    <span className="text-white font-medium">{prod.dailyDrawdown}%</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Max Drawdown:</span>
                    <span className="text-white font-medium">{prod.maxDrawdown}%</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Leverage:</span>
                    <span className="text-white font-medium">{prod.leverage}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Reward Split:</span>
                    <span className="text-[#00E599] font-bold">{prod.rewardSplit}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/checkout?plan=${prod.slug}`}
                    className="w-full block py-3 rounded-xl bg-white/10 hover:bg-[#00E599] hover:text-black text-white text-xs font-bold transition-all text-center"
                  >
                    Select Account
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
