import React from "react";
import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { ShieldCheck, Cpu, Globe, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <BrandLogo size="lg" withTagline />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            About FundedFlex
          </h1>
          <p className="text-sm text-zinc-400 mt-3 max-w-xl mx-auto leading-relaxed">
            Built by institutional traders and fintech engineers to give disciplined operators access to simulated funded capital.
          </p>
        </div>

        <div className="rounded-3xl bg-[#090D0F] border border-white/10 p-8 sm:p-10 space-y-8 text-xs text-zinc-300 leading-relaxed shadow-2xl">
          <div>
            <h2 className="text-lg font-bold text-white mb-2">Our Mission</h2>
            <p>
              At FundedFlex, our philosophy is anchored in three core pillars: <strong>TRADE • GROW • FREEDOM</strong>. We believe traditional capital barriers shouldn&#39;t stop talented traders from proving their edge. By providing transparent simulated evaluations backed by institutional risk limits, we bridge the gap between retail skill and professional simulated performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/5">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <ShieldCheck className="w-5 h-5 text-[#F59E0B] mb-2" />
              <h3 className="font-bold text-white mb-1">Integrity & Rules</h3>
              <p className="text-zinc-400">
                Predictable 5% daily and 10% maximum static drawdown limits without arbitrary restrictions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <Cpu className="w-5 h-5 text-[#F59E0B] mb-2" />
              <h3 className="font-bold text-white mb-1">Fintech Architecture</h3>
              <p className="text-zinc-400">
                Non-custodial crypto checkout, AES-256 encrypted credential vaults, and high-performance interfaces.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <Globe className="w-5 h-5 text-[#F59E0B] mb-2" />
              <h3 className="font-bold text-white mb-1">Global Access</h3>
              <p className="text-zinc-400">
                Seamless crypto payments enable traders worldwide to participate with zero banking friction.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-zinc-400">
              Ready to take your trading to the next tier?
            </span>
            <Link
              href="/accounts"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#F59E0B] text-black font-extrabold text-xs shadow-glow-gold-sm hover:bg-[#D97706] transition-all"
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
