"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is FundedFlex?",
      a: "FundedFlex is a cutting-edge simulated proprietary trading evaluation provider. We offer disciplined traders access to simulated capital challenges where they can prove their market edge under transparent, institutional risk parameters.",
    },
    {
      q: "What is a simulated trading account?",
      a: "All accounts provided by FundedFlex operate in a 100% demo, simulated trading environment. No actual client deposits are traded on live exchange books. This structure allows traders to demonstrate performance without putting personal capital at market risk.",
    },
    {
      q: "How do the challenges work?",
      a: "You select your preferred account size ($5K to $200K), complete the evaluation fee using cryptocurrency, and receive your credentials. Reach the target objective without breaching the 5% daily or 10% maximum drawdown limits to advance.",
    },
    {
      q: "How is the 5% Daily Drawdown calculated?",
      a: "The daily drawdown is calculated based on the previous day's end-of-day balance snapshot (server time 00:00). At no point during the day may your equity or balance drop by more than 5% of that reference figure.",
    },
    {
      q: "What is the 10% Maximum Drawdown?",
      a: "The maximum overall drawdown is a static loss threshold calculated against your initial starting balance. For example, on a $50,000 account, your equity cannot breach $45,000 at any time during your evaluation.",
    },
    {
      q: "What leverage is provided?",
      a: "FundedFlex accounts come standard with 1:100 leverage on foreign exchange currency pairs and precious metals, giving you flexible position sizing while maintaining disciplined risk control.",
    },
    {
      q: "How do crypto payments work?",
      a: "During checkout, you choose your preferred cryptocurrency (USDT TRC20, USDT ERC20, USDC, BTC, or ETH). The screen displays a dynamic QR code, recipient wallet address, and exact payment amount. Once you transfer from your personal wallet, simply submit the transaction hash.",
    },
    {
      q: "How long does payment verification take?",
      a: "Because all crypto transactions are manually verified on-chain by our operations desk, reviews are typically completed within 15 to 45 minutes during business hours.",
    },
    {
      q: "When and where do I receive my credentials?",
      a: "Immediately upon administrator approval, your unique Account ID (e.g. FF-739284), username, and random secure password are generated and displayed securely in your FundedFlex Customer Dashboard.",
    },
    {
      q: "Can I hold positions over weekends or trade news?",
      a: "Yes. Both weekend position holding and high-impact economic news trading are fully permitted on all FundedFlex evaluation tiers.",
    },
  ];

  return (
    <section id="faq" className="py-20 relative bg-[#070A0B] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/20 text-[#00E599] text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Everything you need to know about FundedFlex simulated accounts, rules, and crypto settlement.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#0B0F11] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm font-semibold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-[#00E599]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 pt-1 text-xs text-zinc-300 leading-relaxed border-t border-white/5 bg-white/[0.01]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
