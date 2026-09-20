"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

export default function HeroTradingVisual() {
  const [ticks] = useState([
    { time: "09:30", open: 181.2, high: 182.4, low: 181.0, close: 182.1 },
    { time: "10:00", open: 182.1, high: 183.2, low: 181.8, close: 182.9 },
    { time: "10:30", open: 182.9, high: 183.7, low: 182.6, close: 183.4 },
    { time: "11:00", open: 183.4, high: 184.2, low: 183.0, close: 183.8 },
    { time: "11:30", open: 183.8, high: 184.8, low: 183.5, close: 184.5 },
    { time: "12:00", open: 184.5, high: 185.3, low: 184.2, close: 185.1 },
    { time: "12:30", open: 185.1, high: 186.0, low: 184.9, close: 185.8 },
    { time: "13:00", open: 185.8, high: 186.5, low: 185.4, close: 186.2 },
  ]);

  const [activeTab, setActiveTab] = useState<"equity" | "candles">("equity");
  const [showLiveNotification, setShowLiveNotification] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLiveNotification((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-3xl p-[1px] bg-gradient-to-b from-[#F59E0B]/40 via-white/10 to-transparent shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)] animate-float">
      {/* Outer ambient glow behind card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#F59E0B]/20 to-amber-600/10 rounded-3xl blur-xl opacity-70 pointer-events-none" />

      {/* Main Terminal Container */}
      <div className="relative rounded-[23px] bg-[#070B0D]/95 border border-white/10 backdrop-blur-2xl overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#040608]/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-[#F59E0B] animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] relative" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white tracking-wider">
                PORTFOLIO #FF-100842
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/40 shadow-glow-gold-sm">
                $100K ELITE TIER
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
              LATENCY: 8ms
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
              LEV: 1:100
            </span>
          </div>
        </div>

        {/* Wealth & Balance Display Header */}
        <div className="p-6 bg-gradient-to-b from-[#0B1013]/90 to-[#070B0D] border-b border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest block">
                Total Simulated Portfolio Equity
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight drop-shadow-md">
                  $104,820.00
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-1 rounded-full border border-[#F59E0B]/30">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  +$4,820.00 (+4.82%)
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block">
                Target Objective Progress
              </span>
              <div className="flex items-center gap-2 mt-1 sm:justify-end">
                <span className="text-xl font-bold font-mono text-[#F59E0B]">
                  82%
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  / $8,000 Goal
                </span>
              </div>
            </div>
          </div>

          {/* Luxury Multi-Color Progress Bar */}
          <div className="w-full bg-[#141C20] h-2 rounded-full mt-4 p-[1px] border border-white/5">
            <div
              className="bg-gradient-to-r from-amber-400 via-[#F59E0B] to-amber-300 h-full rounded-full shadow-[0_0_12px_#F59E0B] transition-all duration-1000"
              style={{ width: "82%" }}
            />
          </div>
        </div>

        {/* Metric Gauges */}
        <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#06090A]/60 border-b border-white/5">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              Simulated Profit
            </span>
            <span className="text-lg font-bold text-[#F59E0B] font-mono mt-0.5 block">
              +$4,820.00
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">Closed & Verified</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              Daily Loss Cushion
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-bold text-white font-mono">1.24%</span>
              <span className="text-[11px] text-zinc-500 font-mono">/ 5.0%</span>
            </div>
            <span className="text-[10px] text-amber-400 font-mono font-medium">
              3.76% buffer left
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              Max Loss Cushion
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-bold text-white font-mono">3.18%</span>
              <span className="text-[11px] text-zinc-500 font-mono">/ 10.0%</span>
            </div>
            <span className="text-[10px] text-amber-400 font-mono font-medium">
              6.82% safe limit
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
              Simulated Split
            </span>
            <span className="text-lg font-bold text-white font-mono mt-0.5 block">
              Up to 90%
            </span>
            <span className="text-[10px] text-[#F59E0B] font-mono font-medium">
              Elite Profit Tier
            </span>
          </div>
        </div>

        {/* Chart View */}
        <div className="p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("equity")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  activeTab === "equity"
                    ? "bg-[#F59E0B] text-black shadow-glow-gold-sm"
                    : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                Equity Curve
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("candles")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  activeTab === "candles"
                    ? "bg-[#F59E0B] text-black shadow-glow-gold-sm"
                    : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                Candlestick Terminal
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span>EUR/USD • TICK STREAM LIVE</span>
            </div>
          </div>

          {/* Chart Display Surface */}
          <div className="h-44 w-full relative bg-[#040708] rounded-2xl p-4 border border-white/5 overflow-hidden flex items-end">
            <div className="absolute inset-0 bg-grid-tech opacity-40 pointer-events-none" />

            {activeTab === "equity" ? (
              <svg
                viewBox="0 0 500 150"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="luxuryGoldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                    <stop offset="60%" stopColor="#10B981" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 135 Q 70 120 140 100 T 270 65 T 390 35 L 500 15 L 500 150 L 0 150 Z"
                  fill="url(#luxuryGoldGradient)"
                />
                <path
                  d="M 0 135 Q 70 120 140 100 T 270 65 T 390 35 L 500 15"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"
                />
                {/* Milestone threshold */}
                <line
                  x1="0"
                  y1="22"
                  x2="500"
                  y2="22"
                  stroke="rgba(255,255,255,0.2)"
                  strokeDasharray="5 5"
                  strokeWidth="1.5"
                />
                <text x="10" y="18" fill="#F59E0B" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  ★ PHASE 1 TARGET: $108,000.00
                </text>
              </svg>
            ) : (
              <div className="w-full h-full flex items-end justify-around pb-1">
                {ticks.map((c, i) => {
                  const isBullish = c.close >= c.open;
                  const height = Math.max(20, (c.close - 180.5) * 26);
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-end h-full w-8 group relative"
                    >
                      <div
                        className={`w-[1.5px] ${isBullish ? "bg-[#F59E0B]" : "bg-red-400"}`}
                        style={{ height: "75%" }}
                      />
                      <div
                        className={`w-4 rounded-[3px] -mt-7 transition-all duration-300 ${
                          isBullish
                            ? "bg-gradient-to-t from-amber-600 to-[#F59E0B] shadow-[0_0_10px_#F59E0B]"
                            : "bg-red-500"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[9px] text-zinc-500 font-mono mt-2">
                        {c.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dynamic Live Trade Execution Popup (Wealth / High-Action Feel) */}
          <div
            className={`mt-4 p-3 rounded-xl bg-[#090E11] border border-[#F59E0B]/30 flex items-center justify-between gap-3 text-xs transition-opacity duration-500 ${
              showLiveNotification ? "opacity-100" : "opacity-75"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-[#F59E0B]/20 text-[#F59E0B]">
                <Zap className="w-3.5 h-3.5" />
              </span>
              <span className="text-zinc-200">
                <strong className="text-white">Simulated Execution:</strong> Buy 2.0 Lots XAU/USD (Gold) closed at <span className="text-[#F59E0B] font-mono font-bold">+$1,420.00</span>
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono flex-shrink-0">
              Just now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
