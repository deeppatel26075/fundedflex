"use client";

import React from "react";
import { TrendingUp, Sparkles, Shield, Zap } from "lucide-react";

export default function MarketTicker() {
  const tickerItems = [
    { symbol: "XAU/USD (GOLD)", price: "$2,684.50", change: "+1.48%", positive: true },
    { symbol: "BTC/USDT", price: "$66,410.00", change: "+3.75%", positive: true },
    { symbol: "EUR/USD", price: "1.0845", change: "+0.34%", positive: true },
    { symbol: "ETH/USDT", price: "$2,642.80", change: "+2.12%", positive: true },
    { symbol: "US TECH 100", price: "20,418.20", change: "+1.18%", positive: true },
    { symbol: "SIMULATED POOL", price: "$50,000,000", change: "ALLOCATED", special: true },
    { symbol: "SIMULATED PROFIT SPLIT", price: "UP TO 90%", change: "TIER-1", positive: true },
    { symbol: "MAX LEVERAGE", price: "1:100", change: "INSTITUTIONAL", positive: true },
    { symbol: "CRYPTO SETTLEMENT", price: "USDT / BTC / ETH", change: "0% SLIPPAGE", positive: true },
  ];

  // Duplicate list to create seamless infinite marquee loop
  const displayItems = [...tickerItems, ...tickerItems];

  return (
    <div className="w-full bg-[#05080A]/90 border-b border-white/[0.07] overflow-hidden py-2 text-[11px] font-mono select-none backdrop-blur-md relative z-30">
      <div className="animate-ticker-smooth flex items-center gap-8">
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2 flex-shrink-0 px-2 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
            <span className="font-bold tracking-wider text-zinc-400 group-hover:text-white transition-colors">
              {item.symbol}
            </span>
            <span className="font-bold text-white tracking-wide">
              {item.price}
            </span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                item.special
                  ? "bg-[#00E599]/15 text-[#00FFA3] border border-[#00E599]/30"
                  : "bg-[#00E599]/15 text-[#00E599] border border-[#00E599]/30"
              }`}
            >
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
