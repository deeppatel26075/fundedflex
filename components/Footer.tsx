import React from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { Shield, Lock, AlertTriangle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#040607] border-t border-white/10 text-zinc-400 text-xs">
      {/* Top Footer Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <BrandLogo size="md" withTagline />
            <p className="mt-4 text-xs text-zinc-400 leading-relaxed max-w-md">
              FundedFlex is a premier simulated proprietary evaluation provider. We deliver realistic market conditions, institutional risk guardrails, and non-custodial crypto checkout for ambitious traders globally.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <span className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider">
                Supported Crypto:
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-white">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  USDT (TRC20/ERC20)
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  USDC
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  BTC
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  ETH
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/accounts" className="hover:text-white transition-colors">
                  Account Marketplace
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-white transition-colors">
                  Trading Rules
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Trader Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/risk-disclosure" className="hover:text-white transition-colors">
                  Risk Disclosure & CFTC 4.41
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Simulated Environment Disclosure Block */}
        <div className="pt-8 border-t border-white/10 space-y-4 text-[11px] text-zinc-400 leading-relaxed">
          <div className="flex items-start gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-200">Simulated Trading Disclosure:</strong> All accounts provided by FundedFlex operate strictly within a simulated demo environment. No real market orders are executed on live financial exchanges. All account balances and performance data represent virtual evaluation credits and do not constitute actual trading deposits or client investment funds.
            </div>
          </div>

          <p>
            <strong className="text-zinc-300">CFTC Rule 4.41 Notice:</strong> Hypothetical or simulated performance results have certain limitations. Unlike an actual performance record, simulated results do not represent actual trading. Also, since the trades have not been executed, the results may have under-or-over compensated for the impact, if any, of certain market factors, such as lack of liquidity. Simulated trading programs in general are also subject to the fact that they are designed with the benefit of hindsight. No representation is being made that any account will or is likely to achieve profit or losses similar to those shown.
          </p>

          <p>
            <strong className="text-zinc-300">No Investment Services:</strong> FundedFlex does not act as a broker, custodian, financial intermediary, or investment advisor. All fees collected are non-refundable service fees applied toward platform infrastructure, technology, simulated account access, and evaluation risk systems.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 text-[11px] text-zinc-400">
            <div>
              © {new Date().getFullYear()} FundedFlex. All rights reserved. TRADE | GROW | FREEDOM.
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#F59E0B]" />
                AES-256 Encrypted Credentials
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-[#F59E0B]" />
                Non-Custodial Crypto Checkout
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
