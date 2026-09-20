import React from "react";
import { Cpu, Zap, ShieldCheck, Scale } from "lucide-react";

export default function TrustStrip() {
  const items = [
    {
      icon: Cpu,
      title: "SIMULATED ACCOUNTS",
      desc: "Institutional-grade demo conditions with zero personal capital risk",
    },
    {
      icon: Zap,
      title: "CRYPTO PAYMENTS",
      desc: "Direct non-custodial USDT, USDC, BTC, and ETH checkout",
    },
    {
      icon: ShieldCheck,
      title: "FAST DELIVERY",
      desc: "Rapid account generation upon admin payment confirmation",
    },
    {
      icon: Scale,
      title: "TRANSPARENT RULES",
      desc: "Clear 5% daily & 10% maximum drawdown limits with no surprises",
    },
  ];

  return (
    <div className="w-full border-y border-white/10 bg-[#080B0C]/80 backdrop-blur-md py-6 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/[0.02] transition-colors"
              >
                <div className="p-2.5 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wider text-white uppercase">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
