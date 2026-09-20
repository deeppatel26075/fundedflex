import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  DollarSign,
  Layers,
  ArrowRight,
  ExternalLink,
  Settings,
  Wallet,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login?redirect=/admin");
  }

  // Real database metrics (no fabricated numbers)
  const totalOrders = await prisma.order.count();
  const pendingOrders = await prisma.order.count({
    where: {
      status: {
        in: ["PAYMENT_PENDING_REVIEW", "PAYMENT_SUBMITTED"],
      },
    },
  });
  const confirmedOrders = await prisma.order.count({
    where: {
      status: {
        in: ["ACCOUNT_READY", "PAYMENT_CONFIRMED"],
      },
    },
  });
  const activeAccounts = await prisma.accountCredential.count({
    where: { status: "ACTIVE" },
  });

  const totalVolumeAgg = await prisma.order.aggregate({
    _sum: { amountUSD: true },
    where: {
      status: {
        in: ["ACCOUNT_READY", "PAYMENT_CONFIRMED"],
      },
    },
  });
  const totalRevenue = totalVolumeAgg._sum.amountUSD || 0;

  // Recent pending orders needing review
  const pendingList = await prisma.order.findMany({
    where: {
      status: {
        in: ["PAYMENT_PENDING_REVIEW", "PAYMENT_SUBMITTED"],
      },
    },
    include: {
      user: true,
      product: true,
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  // Recent 10 orders overall
  const recentOrders = await prisma.order.findMany({
    include: {
      user: true,
      product: true,
      credential: true,
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Admin Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#090D0F] border border-white/10 shadow-2xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Operations Desk
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              FundedFlex Command Center
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Review incoming crypto transfers, verify blockchain hashes, and manage product rules.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/orders"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              All Orders ({totalOrders})
            </Link>
            <Link
              href="/admin/products"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              Products & Rules
            </Link>
            <Link
              href="/admin/payment-methods"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              Crypto Wallets
            </Link>
          </div>
        </div>

        {/* Real Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-[#080C0E] border border-white/10">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Pending Reviews
            </span>
            <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">
              {pendingOrders}
            </div>
            <span className="text-[11px] text-zinc-500 mt-0.5 block">Requires desk action</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#080C0E] border border-white/10">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Active Accounts
            </span>
            <div className="text-2xl font-extrabold text-[#F59E0B] font-mono mt-1">
              {activeAccounts}
            </div>
            <span className="text-[11px] text-zinc-500 mt-0.5 block">Provisioned & live</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#080C0E] border border-white/10">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Confirmed Orders
            </span>
            <div className="text-2xl font-extrabold text-white font-mono mt-1">
              {confirmedOrders}
            </div>
            <span className="text-[11px] text-zinc-500 mt-0.5 block">Fully approved</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#080C0E] border border-white/10">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Total Orders
            </span>
            <div className="text-2xl font-extrabold text-white font-mono mt-1">
              {totalOrders}
            </div>
            <span className="text-[11px] text-zinc-500 mt-0.5 block">All time volume</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#080C0E] border border-white/10 col-span-2 lg:col-span-1">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Gross Volume
            </span>
            <div className="text-2xl font-extrabold text-[#F59E0B] font-mono mt-1">
              ${totalRevenue.toLocaleString()}
            </div>
            <span className="text-[11px] text-zinc-500 mt-0.5 block">USD collected</span>
          </div>
        </div>

        {/* PENDING ORDERS QUEUE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              Pending Payment Approvals ({pendingOrders})
            </h2>
          </div>

          {pendingList.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#080C0E] border border-white/10 text-center text-xs text-zinc-400">
              Zero pending payment submissions in queue. All orders are up to date!
            </div>
          ) : (
            <div className="rounded-2xl bg-[#080C0E] border border-white/10 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#050707] text-zinc-400 border-b border-white/10 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-6 py-4">Order Number</th>
                      <th className="px-6 py-4">Trader</th>
                      <th className="px-6 py-4">Plan Tier</th>
                      <th className="px-6 py-4">Expected Crypto</th>
                      <th className="px-6 py-4">TxHash</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Desk Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-300">
                    {pendingList.map((ord) => (
                      <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-white">
                          {ord.orderNumber}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-white font-medium block">
                            {ord.user.name}
                          </span>
                          <span className="text-[11px] text-zinc-500 font-mono">
                            {ord.user.email}
                          </span>
                        </td>
                        <td className="px-6 py-4">{ord.product.name}</td>
                        <td className="px-6 py-4 font-mono font-bold text-[#F59E0B]">
                          {ord.expectedCryptoAmount} {ord.cryptoAsset} ({ord.network})
                        </td>
                        <td className="px-6 py-4 font-mono text-[11px] text-zinc-400 max-w-[150px] truncate">
                          {ord.txHash || "Awaiting hash"}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            {ord.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/admin/orders/${ord.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-black text-xs font-bold shadow-glow-gold-sm transition-all"
                          >
                            <span>Review & Verify</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* RECENT ORDERS TABLE */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent System Orders</h2>
            <Link
              href="/admin/orders"
              className="text-xs text-[#F59E0B] hover:underline font-semibold"
            >
              View Full History →
            </Link>
          </div>

          <div className="rounded-2xl bg-[#080C0E] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#050707] text-zinc-400 border-b border-white/10 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Tier</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Account ID</th>
                    <th className="px-6 py-4 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {recentOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-white">
                        {ord.orderNumber}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-medium block">
                          {ord.user.name}
                        </span>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          {ord.user.email}
                        </span>
                      </td>
                      <td className="px-6 py-4">{ord.product.name}</td>
                      <td className="px-6 py-4 font-mono">${ord.amountUSD}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                            ord.status === "ACCOUNT_READY" || ord.status === "PAYMENT_CONFIRMED"
                              ? "bg-amber-500/10 text-[#F59E0B] border-amber-500/20"
                              : ord.status === "PAYMENT_PENDING_REVIEW"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : ord.status === "PAYMENT_REJECTED"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-zinc-800 text-zinc-300 border-white/10"
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-white">
                        {ord.credential?.accountId || "—"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/orders/${ord.id}`}
                          className="text-zinc-400 hover:text-white inline-flex items-center gap-1"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
