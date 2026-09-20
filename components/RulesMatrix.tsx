import React from "react";
import { ShieldCheck, Check, AlertCircle, Info } from "lucide-react";
import Link from "next/link";

export default function RulesMatrix() {
  const rules = [
    {
      name: "Daily Drawdown",
      value: "5.0%",
      type: "Hard Rule",
      desc: "Maximum permitted equity loss in a single trading day based on previous day's balance snapshot.",
      allowed: true,
    },
    {
      name: "Maximum Overall Drawdown",
      value: "10.0%",
      type: "Hard Rule",
      desc: "Static overall loss ceiling calculated strictly against your initial simulated starting balance.",
      allowed: true,
    },
    {
      name: "Account Leverage",
      value: "1:100",
      type: "Trading Parameter",
      desc: "Standard institutional leverage across major FX currency pairs and precious metals.",
      allowed: true,
    },
    {
      name: "Profit Target",
      value: "8.0%",
      type: "Objective",
      desc: "Target return required to complete your evaluation phase. No time pressure to complete.",
      allowed: true,
    },
    {
      name: "Weekend Position Holding",
      value: "Permitted",
      type: "Trading Freedom",
      desc: "Hold swing trades and multi-day positions over weekends without mandatory market close.",
      allowed: true,
    },
    {
      name: "High-Impact News Trading",
      value: "Permitted",
      type: "Trading Freedom",
      desc: "Execute strategies during major macroeconomic news releases, CPI, and central bank decisions.",
      allowed: true,
    },
    {
      name: "EAs & Automated Bots",
      value: "Permitted",
      type: "Trading Freedom",
      desc: "Expert Advisors (EAs), algorithmic trading scripts, and risk management utilities are allowed.",
      allowed: true,
    },
    {
      name: "Minimum Trading Days",
      value: "3 Days",
      type: "Fairness Standard",
      desc: "A minimum of 3 separate trading days is required to demonstrate consistent trading discipline.",
      allowed: true,
    },
  ];

  return (
    <section id="rules" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Transparent Framework
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            FundedFlex Trading Rules
          </h2>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
            Our rules are crafted to protect capital discipline while granting traders maximum flexibility. No hidden consistency traps or ambiguous clauses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#090D0F] border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-400 font-medium">
                    {rule.type}
                  </span>
                  <span className="text-[#F59E0B] flex items-center gap-1 font-semibold text-xs">
                    <Check className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {rule.name}
                </h3>
                <div className="text-2xl font-extrabold text-white font-mono my-2 text-[#F59E0B]">
                  {rule.value}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {rule.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-zinc-500">
                Rule ID: #FF-RULE-0{idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Note banner */}
        <div className="mt-10 p-5 rounded-2xl bg-[#0E1315] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-[#F59E0B] flex-shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <p className="text-xs text-zinc-300">
              <strong className="text-white">Admin-Configurable:</strong> All rules and parameters are dynamically managed through the central FundedFlex system.
            </p>
          </div>
          <Link
            href="/rules"
            className="text-xs font-semibold text-[#F59E0B] hover:underline flex-shrink-0"
          >
            Read Full Rules Documentation →
          </Link>
        </div>
      </div>
    </section>
  );
}
