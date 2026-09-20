import React from "react";

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs text-zinc-300 leading-relaxed">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#00E599]">
          Data Protection
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Privacy Policy
        </h1>
        <p className="text-zinc-500 mt-1">Last Updated: September 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#090D0F] border border-white/10 space-y-6 shadow-xl">
        <div>
          <h2 className="text-sm font-bold text-white mb-1.5">1. Information We Collect</h2>
          <p>
            FundedFlex collects basic identification and communication information necessary for account provisioning and transaction verification, including your name, email address, and cryptocurrency transaction hashes.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white mb-1.5">2. Protection of Sensitive Data</h2>
          <p>
            Your generated trading credentials are encrypted at rest using industry-standard AES-256-GCM encryption. We do not store sensitive private keys, seed phrases, or credit card details.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white mb-1.5">3. Third-Party Sharing</h2>
          <p>
            We do not sell, rent, or distribute your personal information to third-party marketing companies. Data is only utilized for operational verification, technical communication, and service provisioning.
          </p>
        </div>
      </div>
    </div>
  );
}
