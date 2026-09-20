import { Coins, ShieldCheck, TrendingUp, Globe } from "lucide-react";

export default function TrustStrip() {
  const items = [
    {
      icon: Coins,
      title: "INSTITUTIONAL FUNDING",
      desc: "Up to $200,000 in simulated proprietary trading capital with instant crypto settlement",
    },
    {
      icon: ShieldCheck,
      title: "MANAGE RISK",
      desc: "Transparent 5% daily & 10% maximum drawdown limits engineered for consistency",
    },
    {
      icon: TrendingUp,
      title: "PROFESSIONAL EXECUTION",
      desc: "Institutional spreads, zero hidden rules, and full FundedFlex MT5 terminal compatibility",
    },
    {
      icon: Globe,
      title: "GLOBAL TRADERS",
      desc: "Join an elite international community of traders. Trade Bigger. Live Freer.",
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
                <div className="p-2.5 rounded-lg bg-[#00E599]/10 border border-[#00E599]/20 text-[#00E599] flex-shrink-0">
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
