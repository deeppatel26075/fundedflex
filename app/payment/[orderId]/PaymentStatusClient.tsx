"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  KeyRound,
} from "lucide-react";

interface OrderData {
  id: string;
  orderNumber: string;
  amountUSD: number;
  cryptoAsset: string;
  network: string;
  walletAddress: string;
  expectedCryptoAmount: number;
  txHash: string | null;
  status: string;
  rejectionReason: string | null;
  adminNotes: string | null;
  createdAt: string;
  approvedAt: string | null;
  product: {
    name: string;
    accountSize: number;
  };
  credential: {
    accountId: string;
    username: string;
    server: string;
  } | null;
}

interface PaymentStatusClientProps {
  initialOrder: OrderData;
  isOwnerOrAdmin: boolean;
}

export default function PaymentStatusClient({
  initialOrder,
  isOwnerOrAdmin,
}: PaymentStatusClientProps) {
  const [order, setOrder] = useState<OrderData>(initialOrder);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const router = useRouter();

  const refreshStatus = async () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACCOUNT_READY":
      case "PAYMENT_CONFIRMED":
        return {
          label: "ACCOUNT READY",
          bg: "bg-[#00E599]/10 text-[#00E599] border-[#00E599]/20",
          icon: CheckCircle2,
        };
      case "PAYMENT_PENDING_REVIEW":
        return {
          label: "PAYMENT UNDER REVIEW",
          bg: "bg-[#00E599]/10 text-[#00E599] border-[#00E599]/20",
          icon: Clock,
        };
      case "PAYMENT_SUBMITTED":
        return {
          label: "PAYMENT SUBMITTED",
          bg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
          icon: Clock,
        };
      case "PAYMENT_REJECTED":
        return {
          label: "PAYMENT REJECTED",
          bg: "bg-red-500/10 text-red-400 border-red-500/20",
          icon: AlertCircle,
        };
      default:
        return {
          label: "AWAITING PAYMENT",
          bg: "bg-zinc-800 text-zinc-300 border-white/10",
          icon: Clock,
        };
    }
  };

  const currentBadge = getStatusBadge(order.status);
  const BadgeIcon = currentBadge.icon;

  return (
    <div className="rounded-3xl bg-[#090D0F] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono text-zinc-400 block">
            ORDER REFERENCE
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-1">
            {order.orderNumber}
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${currentBadge.bg}`}
          >
            <BadgeIcon className="w-4 h-4" />
            {currentBadge.label}
          </span>

          <button
            onClick={refreshStatus}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors"
            title="Refresh status"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#00E599]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Dynamic Status Callout Banner */}
      {order.status === "ACCOUNT_READY" && (
        <div className="p-6 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/30 text-white space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#00E599] text-black">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Your FundedFlex Account Is Ready!
              </h3>
              <p className="text-xs text-zinc-300 mt-0.5">
                Payment verified. Account #{order.credential?.accountId} has been provisioned.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00E599] hover:bg-[#00c784] text-black text-xs font-extrabold shadow-glow-green-sm transition-all"
            >
              <span>Open Customer Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {order.status === "PAYMENT_PENDING_REVIEW" && (
        <div className="p-6 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/20 text-white space-y-2">
          <div className="flex items-center gap-2 text-[#00FFA3] font-bold text-sm">
            <Clock className="w-4 h-4" />
            Payment In Verification Queue
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Your transaction hash has been recorded. Our administrative operations desk verifies blockchain transfers manually to protect our liquidity and capital infrastructure. Once confirmed, your unique credentials will be activated in your dashboard.
          </p>
        </div>
      )}

      {order.status === "PAYMENT_REJECTED" && (
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-white space-y-2">
          <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
            <AlertCircle className="w-4 h-4" />
            Payment Verification Notice
          </div>
          <p className="text-xs text-zinc-300">
            {order.rejectionReason ||
              "Your transaction hash could not be verified on the designated blockchain network. Please check the transaction hash or contact support."}
          </p>
        </div>
      )}

      {/* Order & Payment Summary Details */}
      <div className="p-6 rounded-2xl bg-[#050707] border border-white/10 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
          Payment Specification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-zinc-500 block">Package Tier:</span>
            <span className="text-white font-bold text-sm">{order.product.name}</span>
          </div>

          <div>
            <span className="text-zinc-500 block">Simulated Capital:</span>
            <span className="text-white font-bold text-sm">
              ${order.product.accountSize.toLocaleString()} USD
            </span>
          </div>

          <div>
            <span className="text-zinc-500 block">Required Crypto Amount:</span>
            <span className="text-[#00E599] font-mono font-bold text-sm">
              {order.expectedCryptoAmount} {order.cryptoAsset}
            </span>
          </div>

          <div>
            <span className="text-zinc-500 block">Designated Network:</span>
            <span className="text-white font-mono font-medium">
              {order.network}
            </span>
          </div>
        </div>

        {order.txHash && (
          <div className="pt-3 border-t border-white/5">
            <span className="text-xs text-zinc-500 block mb-1">
              Registered Transaction Hash:
            </span>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-white/5 font-mono text-xs text-zinc-200">
              <span className="truncate mr-2">{order.txHash}</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(order.txHash || "");
                  setCopiedHash(true);
                  setTimeout(() => setCopiedHash(false), 2000);
                }}
                className="text-zinc-400 hover:text-white flex-shrink-0"
              >
                {copiedHash ? (
                  <Check className="w-4 h-4 text-[#00E599]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Actions */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
        <Link
          href="/dashboard"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          ← Return to Trader Dashboard
        </Link>
        <Link
          href="/accounts"
          className="text-[#00E599] hover:underline font-semibold"
        >
          Browse Other Accounts →
        </Link>
      </div>
    </div>
  );
}
