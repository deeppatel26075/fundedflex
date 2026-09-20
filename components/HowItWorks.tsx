import React from "react";
import { CheckCircle, ShieldCheck, Wallet, KeyRound, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Account",
      desc: "Select your desired evaluation tier from $5,000 up to $200,000 with clear 5% daily and 10% maximum drawdown limits.",
      icon: Sparkles,
    },
    {
      num: "02",
      title: "Complete Crypto Payment",
      desc: "Pay directly with non-custodial crypto (USDT TRC20/ERC20, USDC, BTC, ETH) using dynamic QR codes and wallet addresses.",
      icon: Wallet,
    },
    {
      num: "03",
      title: "Payment Verification",
      desc: "Submit your blockchain transaction hash. Our administrative operations team quickly verifies the transfer on-chain.",
      icon: ShieldCheck,
    },
    {
      num: "04",
      title: "Receive Credentials",
      desc: "Upon approval, the system generates your unique Account ID (FF-XXXXXX), username, and secure password in your dashboard.",
      icon: KeyRound,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 relative bg-[#070A0B] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
            Simplicity & Precision
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            How FundedFlex Works
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            A frictionless 4-step path from selecting your simulated tier to receiving your institutional demo credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-[#0B0F11] border border-white/10 p-6 flex flex-col justify-between hover:border-[#F59E0B]/30 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold font-mono text-zinc-600 group-hover:text-[#F59E0B] transition-colors">
                      {s.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-[#F59E0B]/10 text-zinc-300 group-hover:text-[#F59E0B] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F59E0B] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Phase {s.num} Milestones</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
