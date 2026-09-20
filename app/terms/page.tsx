import React from "react";

export default function TermsPage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs text-zinc-300 leading-relaxed">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
          Legal Framework
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Terms of Service
        </h1>
        <p className="text-zinc-500 mt-1">Last Updated: September 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#090D0F] border border-white/10 space-y-6 shadow-xl">
        <div>
          <h2 className="text-sm font-bold text-white mb-1.5">1. General Overview</h2>
          <p>
            Welcome to FundedFlex. By accessing or participating in any evaluation accounts or services provided on this website, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white mb-1.5">2. Simulated Trading Nature</h2>
          <p>
            All products, accounts, and evaluations provided by FundedFlex operate strictly within a simulated trading environment. No actual orders are routed to live financial exchanges. All account balances, profits, and equity values are hypothetical demo credits and do not constitute actual client deposits.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white mb-1.5">3. Evaluation Service Fees</h2>
          <p>
            All fees paid to FundedFlex are strictly non-refundable service fees intended to cover administrative, technological, and risk evaluation expenses. Payment of fees does not constitute an investment or deposit.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white mb-1.5">4. Compliance & Restrictions</h2>
          <p>
            Users are strictly responsible for verifying that participating in simulated prop trading evaluations is lawful in their respective jurisdiction. Services are not offered in jurisdictions where prohibited by applicable sanctions.
          </p>
        </div>
      </div>
    </div>
  );
}
