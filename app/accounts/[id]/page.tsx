import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Check, ArrowRight, ShieldCheck, Zap, AlertCircle, Scale } from "lucide-react";

export const revalidate = 0;

interface PageProps {
  params: {
    id: string; // can be slug or id
  };
}

export default async function AccountDetailPage({ params }: PageProps) {
  const { id } = params;

  // Search by slug or id
  const product = await prisma.product.findFirst({
    where: {
      OR: [{ slug: id }, { id: id }],
      isActive: true,
    },
  });

  if (!product) {
    notFound();
  }

  const dailyDollar = (product.accountSize * product.dailyDrawdown) / 100;
  const maxDollar = (product.accountSize * product.maxDrawdown) / 100;
  const targetDollar = (product.accountSize * product.profitTarget) / 100;

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/accounts" className="hover:text-white transition-colors">
            Accounts
          </Link>
          <span>/</span>
          <span className="text-white font-medium">{product.name}</span>
        </div>

        {/* Main Product Header Card */}
        <div className="rounded-3xl bg-[#0A0E10] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E599]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#00E599]/10 text-[#00E599] text-xs font-bold uppercase tracking-wider mb-2 border border-[#00E599]/20">
                Simulated Evaluation Tier
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                ${product.accountSize.toLocaleString()}{" "}
                <span className="text-zinc-400 font-normal text-2xl sm:text-3xl">
                  Simulated Account
                </span>
              </h1>
              <p className="text-sm text-zinc-400 mt-2">
                One-time registration fee • No recurring subscription • Fast crypto delivery
              </p>
            </div>

            <div className="md:text-right flex flex-col items-start md:items-end">
              <div className="text-4xl font-extrabold text-white font-mono">
                ${product.priceUSD}{" "}
                <span className="text-sm text-zinc-400 font-sans font-normal">
                  USD
                </span>
              </div>
              <span className="text-xs text-[#00E599] font-medium mt-1">
                Crypto Settlement Available
              </span>
              <Link
                href={`/checkout?plan=${product.slug}`}
                className="mt-4 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#00E599] hover:bg-[#00c784] text-black font-extrabold text-sm shadow-glow-green-sm transition-all"
              >
                <span>Get This Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Key Metrics Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs text-zinc-400 block">Daily Drawdown</span>
              <span className="text-xl font-bold text-white font-mono mt-1 block">
                {product.dailyDrawdown}%
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                ${dailyDollar.toLocaleString()} limit
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs text-zinc-400 block">Maximum Drawdown</span>
              <span className="text-xl font-bold text-white font-mono mt-1 block">
                {product.maxDrawdown}%
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                ${maxDollar.toLocaleString()} limit
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs text-zinc-400 block">Leverage</span>
              <span className="text-xl font-bold text-white font-mono mt-1 block">
                {product.leverage}
              </span>
              <span className="text-[11px] text-zinc-500">Forex & Metals</span>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs text-zinc-400 block">Profit Target</span>
              <span className="text-xl font-bold text-[#00E599] font-mono mt-1 block">
                {product.profitTarget}%
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">
                ${targetDollar.toLocaleString()} goal
              </span>
            </div>
          </div>

          {/* Secondary Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-white/5 text-xs">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Trading Period:</span>
              <span className="text-white font-medium">{product.tradingPeriod}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Minimum Trading Days:</span>
              <span className="text-white font-medium">{product.minTradingDays} Days</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Simulated Reward Split:</span>
              <span className="text-[#00E599] font-semibold">{product.rewardSplit}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Weekend Holding:</span>
              <span className="text-[#00E599] font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Allowed
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">News Trading:</span>
              <span className="text-[#00E599] font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Allowed
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">EAs / Algo Trading:</span>
              <span className="text-[#00E599] font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Allowed
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Rules Explanation */}
        <div className="rounded-2xl bg-[#080C0E] border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Scale className="w-5 h-5 text-[#00E599]" />
            Detailed Rule Guidelines for this Tier
          </div>

          <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <h4 className="font-bold text-white text-sm mb-1">
                1. Daily Loss Limit ({product.dailyDrawdown}%)
              </h4>
              <p>
                Calculated at 00:00 server time based on the previous day&#39;s ending balance. At no point during the trading day may your daily losses (floating open losses + closed losses) exceed ${dailyDollar.toLocaleString()}.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <h4 className="font-bold text-white text-sm mb-1">
                2. Maximum Overall Drawdown ({product.maxDrawdown}%)
              </h4>
              <p>
                A static overall drawdown ceiling. For this ${product.accountSize.toLocaleString()} tier, your total equity may never drop below ${(product.accountSize - maxDollar).toLocaleString()}.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <h4 className="font-bold text-white text-sm mb-1">
                3. Objective & Evaluation Milestones ({product.profitTarget}%)
              </h4>
              <p>
                To successfully pass your evaluation, generate a simulated profit of ${targetDollar.toLocaleString()} without violating the drawdown criteria. You have unlimited calendar time to reach this milestone.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-400">
              Ready to start your challenge? Checkout securely via crypto.
            </div>
            <Link
              href={`/checkout?plan=${product.slug}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00E599] hover:bg-[#00c784] text-black font-extrabold text-sm shadow-glow-green-sm transition-all text-center"
            >
              Get This Account →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
