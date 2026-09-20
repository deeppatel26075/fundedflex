import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ExternalLink, ArrowLeft, Clock } from "lucide-react";

export const revalidate = 0;

export default async function AdminOrdersListPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login?redirect=/admin/orders");
  }

  const orders = await prisma.order.findMany({
    include: {
      user: true,
      product: true,
      credential: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Command Center</span>
          </Link>
          <span className="text-xs font-mono text-zinc-400">
            Total Orders: {orders.length}
          </span>
        </div>

        <div className="rounded-3xl bg-[#090D0F] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-white">
              System Order Queue
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Complete log of trader checkout orders, submitted cryptocurrency payments, and provisioned credentials.
            </p>
          </div>

          <div className="rounded-2xl bg-[#050707] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900/60 text-zinc-400 border-b border-white/10 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Order Number</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Account Size</th>
                    <th className="px-6 py-4">Crypto Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Account ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {orders.map((ord) => (
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
                      <td className="px-6 py-4">
                        ${ord.product.accountSize.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-mono text-[#F59E0B]">
                        {ord.expectedCryptoAmount} {ord.cryptoAsset}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            ord.status === "ACCOUNT_READY" || ord.status === "PAYMENT_CONFIRMED"
                              ? "bg-amber-500/10 text-[#F59E0B] border-amber-500/20"
                              : ord.status === "PAYMENT_PENDING_REVIEW"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : ord.status === "PAYMENT_REJECTED"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-zinc-800 text-zinc-300 border-white/10"
                          }`}
                        >
                          {ord.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-white">
                        {ord.credential?.accountId || "—"}
                      </td>
                      <td className="px-6 py-4 text-zinc-500">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/orders/${ord.id}`}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#F59E0B] hover:text-black text-white text-xs font-semibold transition-all inline-flex items-center gap-1"
                        >
                          <span>Review</span>
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
