import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs text-zinc-300 leading-relaxed">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#00E599]">
          Financial Guidelines
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Fee & Refund Policy
        </h1>
        <p className="text-zinc-500 mt-1">Last Updated: September 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#090D0F] border border-white/10 space-y-6 shadow-xl">
        <div>
          <h2 className="text-sm font-bold text-white mb-1.5">1. Evaluation Service Fees</h2>
          <p>
            All fees paid for FundedFlex evaluation accounts cover administrative provisioning, risk management systems, and simulated platform infrastructure. Once credentials have been generated and delivered to the customer area, fees are strictly non-refundable.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white mb-1.5">2. Unopened Orders & Pre-Provisioning</h2>
          <p>
            If you have submitted a cryptocurrency payment and wish to cancel before credentials have been generated, you may submit a request to our operations desk. Once reviewed, refunds may be issued minus network blockchain gas fees.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white mb-1.5">3. Milestone Fee Reimbursement</h2>
          <p>
            Certain evaluation tiers feature a 100% evaluation fee reimbursement upon successfully passing both challenge phases and requesting your first eligible simulated reward payout.
          </p>
        </div>
      </div>
    </div>
  );
}
