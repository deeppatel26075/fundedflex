import React from "react";
import RulesMatrix from "@/components/RulesMatrix";
import Link from "next/link";
import { ArrowRight, Check, Shield } from "lucide-react";

export default function RulesPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00E599]">
            Transparent Framework
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
            FundedFlex Evaluation Rules
          </h1>
          <p className="text-sm text-zinc-400 mt-3">
            Clear, institutional risk guidelines designed to cultivate profitable trading discipline without artificial traps.
          </p>
        </div>

        <RulesMatrix />

        {/* Detailed Sections */}
        <div className="rounded-3xl bg-[#090D0F] border border-white/10 p-8 space-y-8 text-xs text-zinc-300 leading-relaxed">
          <div>
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00E599]" />
              Drawdown Calculation Mechanics
            </h3>
            <p>
              The <strong>5% Daily Drawdown</strong> is calculated based on the previous day&#39;s ending equity/balance at 00:00 server time. If your starting balance for the day is $50,000, your equity cannot dip below $47,500 during that 24-hour cycle.
            </p>
            <p className="mt-2">
              The <strong>10% Maximum Overall Drawdown</strong> is a static threshold tied to your starting account balance. On a $50,000 account, your equity may never breach $45,000 at any point during the challenge.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Check className="w-4 h-4 text-[#00E599]" />
              Trading Styles Permitted
            </h3>
            <ul className="list-disc list-inside space-y-1 text-zinc-400">
              <li>Discretionary manual trading across Forex, Metals, and Crypto pairs</li>
              <li>Automated trading using Expert Advisors (EAs) and algorithmic bots</li>
              <li>Holding swing positions over weekends</li>
              <li>Trading through high-impact economic news releases (CPI, NFP, Rate Decisions)</li>
            </ul>
          </div>

          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
            <span className="text-zinc-400">
              Ready to start your challenge?
            </span>
            <Link
              href="/accounts"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#00E599] text-black font-extrabold text-xs shadow-glow-green-sm hover:bg-[#00c784] transition-all"
            >
              <span>Explore Accounts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
