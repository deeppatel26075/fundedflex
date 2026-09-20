import React from "react";
import { AlertTriangle } from "lucide-react";

export default function RiskDisclosurePage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs text-zinc-300 leading-relaxed">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Regulatory Notices
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Risk Disclosure & CFTC Rule 4.41 Notice
        </h1>
        <p className="text-zinc-500 mt-1">Last Updated: September 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#090D0F] border border-white/10 space-y-6 shadow-xl">
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-white mb-1">General High-Risk Warning:</strong>
            Trading foreign exchange, cryptocurrencies, and financial contracts on leverage carries high volatility and risk. You may experience significant losses in simulated or real market conditions.
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white mb-1.5">
            CFTC Rule 4.41 — Hypothetical or Simulated Performance Results
          </h2>
          <p>
            Hypothetical or simulated performance results have inherent limitations. Unlike an actual performance record, simulated results do not represent actual trading. Also, since the trades have not been executed, the results may have under-or-over compensated for the impact, if any, of certain market factors, such as lack of liquidity.
          </p>
          <p className="mt-2">
            Simulated trading programs in general are also subject to the fact that they are designed with the benefit of hindsight. No representation is being made that any account will or is likely to achieve profits or losses similar to those shown.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white mb-1.5">
            No Investment Advice or Brokerage Services
          </h2>
          <p>
            FundedFlex is not an investment advisor, broker-dealer, custodian, or financial intermediary. We do not provide trading recommendations or solicit investment capital. All activities conducted on this platform are for educational and performance evaluation purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
