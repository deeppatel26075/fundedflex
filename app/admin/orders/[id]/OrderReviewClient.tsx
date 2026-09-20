"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  XCircle,
  ExternalLink,
  Copy,
  Check,
  KeyRound,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface OrderReviewProps {
  initialOrder: {
    id: string;
    orderNumber: string;
    amountUSD: number;
    cryptoAsset: string;
    network: string;
    walletAddress: string;
    expectedCryptoAmount: number;
    txHash: string | null;
    paymentProof: string | null;
    status: string;
    rejectionReason: string | null;
    adminNotes: string | null;
    createdAt: string;
    approvedAt: string | null;
    user: {
      id: string;
      name: string;
      email: string;
    };
    product: {
      name: string;
      accountSize: number;
      priceUSD: number;
      leverage: string;
      dailyDrawdown: number;
      maxDrawdown: number;
    };
    credential: {
      id: string;
      accountId: string;
      username: string;
      server: string;
      status: string;
    } | null;
  };
}

export default function OrderReviewClient({ initialOrder }: OrderReviewProps) {
  const [order, setOrder] = useState(initialOrder);
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Rejection modal
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Provisioned credentials modal
  const [generatedCreds, setGeneratedCreds] = useState<{
    accountId: string;
    username: string;
    rawPassword: string;
    server: string;
    initialBalance: number;
  } | null>(null);

  const [copiedHash, setCopiedHash] = useState(false);
  const router = useRouter();

  // Helper to open explorer
  const getExplorerUrl = (tx: string, net: string) => {
    const clean = tx.trim();
    if (net.includes("TRC20") || net.includes("TRON")) {
      return `https://tronscan.org/#/transaction/${clean}`;
    }
    if (net.includes("ERC20") || net.includes("ETHEREUM")) {
      return `https://etherscan.io/tx/${clean}`;
    }
    if (net.includes("BEP20") || net.includes("BSC")) {
      return `https://bscscan.com/tx/${clean}`;
    }
    if (net.includes("BITCOIN")) {
      return `https://www.blockchain.com/explorer/transactions/btc/${clean}`;
    }
    return `https://google.com/search?q=${clean}+transaction`;
  };

  // 1. Approve Payment Action
  const handleApprove = async () => {
    if (!confirm("Are you sure you want to approve this payment and provision credentials?")) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/orders/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Approval failed");
      }

      setActionSuccess(data.message);
      if (data.credential) {
        setGeneratedCreds(data.credential);
      }
      setOrder((prev) => ({
        ...prev,
        status: "ACCOUNT_READY",
        approvedAt: new Date().toISOString(),
      }));
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to approve payment");
    } finally {
      setLoading(false);
    }
  };

  // 2. Reject Payment Action
  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejecting the payment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/orders/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          rejectionReason: rejectionReason.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Rejection failed");
      }

      setShowRejectModal(false);
      setActionSuccess("Payment has been rejected.");
      setOrder((prev) => ({
        ...prev,
        status: "PAYMENT_REJECTED",
        rejectionReason: rejectionReason.trim(),
      }));
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to reject payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>
        <span className="text-xs font-mono text-zinc-500">
          Order ID: {order.id}
        </span>
      </div>

      {/* Main Review Card */}
      <div className="rounded-3xl bg-[#090D0F] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00E599]">
              ADMIN PAYMENT VERIFICATION
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              {order.orderNumber}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Created {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <span
            className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
              order.status === "ACCOUNT_READY" || order.status === "PAYMENT_CONFIRMED"
                ? "bg-[#00E599]/10 text-[#00E599] border-[#00E599]/20"
                : order.status === "PAYMENT_PENDING_REVIEW"
                ? "bg-[#00E599]/10 text-[#00E599] border-[#00E599]/20"
                : order.status === "PAYMENT_REJECTED"
                ? "bg-red-500/10 text-red-400 border-red-500/20"
                : "bg-zinc-800 text-zinc-300 border-white/10"
            }`}
          >
            {order.status}
          </span>
        </div>

        {/* Feedback alerts */}
        {actionSuccess && (
          <div className="p-4 rounded-xl bg-[#00E599]/10 border border-[#00E599]/20 text-[#00E599] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* PROVISIONED CREDENTIALS BANNER */}
        {(generatedCreds || order.credential) && (
          <div className="p-6 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/30 text-white space-y-4">
            <div className="flex items-center gap-2 text-[#00E599] font-bold text-sm">
              <KeyRound className="w-4 h-4" />
              <span>Simulated Trading Account Provisioned</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono bg-black/40 p-4 rounded-xl border border-white/10">
              <div>
                <span className="text-zinc-500 block text-[10px]">ACCOUNT ID</span>
                <span className="text-white font-bold">
                  {generatedCreds?.accountId || order.credential?.accountId}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">USERNAME</span>
                <span className="text-white font-bold">
                  {generatedCreds?.username || order.credential?.username}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">INITIAL PASSWORD</span>
                <span className="text-[#00E599] font-bold">
                  {generatedCreds?.rawPassword || "Encrypted at rest"}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">SERVER</span>
                <span className="text-white font-bold">
                  {generatedCreds?.server || order.credential?.server}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Grid: Customer Info & Payment Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer info */}
          <div className="p-5 rounded-2xl bg-[#050707] border border-white/5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
              Trader Details
            </span>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Name:</span>
              <span className="text-white font-medium">{order.user.name}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Email:</span>
              <span className="text-white font-mono">{order.user.email}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Customer ID:</span>
              <span className="text-zinc-400 font-mono">{order.user.id}</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-5 rounded-2xl bg-[#050707] border border-white/5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
              Selected Plan
            </span>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Package:</span>
              <span className="text-white font-bold">{order.product.name}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Simulated Capital:</span>
              <span className="text-white font-mono font-bold">
                ${order.product.accountSize.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Order Amount:</span>
              <span className="text-[#00E599] font-mono font-bold">
                ${order.amountUSD} USD
              </span>
            </div>
          </div>
        </div>

        {/* Blockchain Transaction Verification Card */}
        <div className="p-6 rounded-2xl bg-[#050707] border border-white/10 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
            Cryptocurrency Verification Details
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-zinc-500 block">Expected Crypto:</span>
              <span className="text-lg font-bold text-[#00E599] font-mono mt-0.5 block">
                {order.expectedCryptoAmount} {order.cryptoAsset}
              </span>
            </div>

            <div>
              <span className="text-zinc-500 block">Designated Network:</span>
              <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                {order.network}
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs text-zinc-500 block mb-1">
              Deposit Wallet Address:
            </span>
            <span className="text-xs font-mono text-zinc-300 block select-all p-2 rounded-lg bg-black/40 border border-white/5">
              {order.walletAddress}
            </span>
          </div>

          <div>
            <span className="text-xs text-zinc-500 block mb-1">
              Submitted Transaction Hash:
            </span>
            {order.txHash ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                <span className="text-zinc-200 select-all break-all">
                  {order.txHash}
                </span>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(order.txHash || "");
                      setCopiedHash(true);
                      setTimeout(() => setCopiedHash(false), 2000);
                    }}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                    title="Copy Hash"
                  >
                    {copiedHash ? (
                      <Check className="w-4 h-4 text-[#00E599]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <a
                    href={getExplorerUrl(order.txHash, order.network)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00E599]/10 hover:bg-[#00E599]/20 text-[#00E599] text-xs font-semibold border border-[#00E599]/20"
                  >
                    <span>Verify on Explorer</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <span className="text-xs text-zinc-500 italic">
                Trader has not yet submitted a transaction hash.
              </span>
            )}
          </div>
        </div>

        {/* Desk Action Buttons */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-400">
            {order.status === "ACCOUNT_READY" ? (
              <span className="text-[#00E599] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                This order has already been verified and provisioned.
              </span>
            ) : (
              <span>
                Verify the transfer on the block explorer before approving.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {order.status !== "ACCOUNT_READY" && (
              <>
                <button
                  type="button"
                  onClick={() => setShowRejectModal(true)}
                  disabled={loading}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs border border-red-500/20 transition-colors"
                >
                  Reject Payment
                </button>

                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#00E599] hover:bg-[#00c784] text-black font-extrabold text-xs shadow-glow-green-sm transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Account...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Approve & Provision Account</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* REJECTION MODAL */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-[#0B0F11] border border-white/10 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              Reject Payment Confirmation
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Please enter an explanation for the rejection. This will be recorded in the audit log and displayed to the customer.
            </p>

            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Transaction hash not found on blockchain / Amount received does not match invoice."
              className="w-full p-3 rounded-xl bg-[#050707] border border-white/10 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-red-500"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                disabled={loading}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
