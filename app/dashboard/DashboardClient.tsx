"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  PlusCircle,
  Clock,
  Layers,
  ArrowRight,
  LogOut,
  AlertCircle,
} from "lucide-react";

interface AccountCredentialItem {
  id: string;
  accountId: string;
  username: string;
  server: string;
  platform: string;
  initialBalance: number;
  status: string;
  createdAt: string;
  order: {
    orderNumber: string;
    amountUSD: number;
    cryptoAsset: string;
    product: {
      name: string;
      accountSize: number;
      leverage: string;
      dailyDrawdown: number;
      maxDrawdown: number;
    };
  };
}

interface OrderItem {
  id: string;
  orderNumber: string;
  amountUSD: number;
  cryptoAsset: string;
  network: string;
  status: string;
  createdAt: string;
  product: {
    name: string;
    accountSize: number;
  };
}

interface DashboardClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  credentials: AccountCredentialItem[];
  orders: OrderItem[];
}

export default function DashboardClient({
  user,
  credentials,
  orders,
}: DashboardClientProps) {
  const router = useRouter();

  // Password revelation state map
  const [revealedPasswords, setRevealedPasswords] = useState<{ [id: string]: string }>({});
  const [loadingReveal, setLoadingReveal] = useState<{ [id: string]: boolean }>({});
  const [copyStatus, setCopyStatus] = useState<{ [id: string]: string }>({});

  const handleRevealPassword = async (credentialId: string) => {
    if (revealedPasswords[credentialId]) {
      // Toggle hide
      const updated = { ...revealedPasswords };
      delete updated[credentialId];
      setRevealedPasswords(updated);
      return;
    }

    setLoadingReveal((prev) => ({ ...prev, [credentialId]: true }));
    try {
      const res = await fetch("/api/credentials/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credentialId }),
      });

      const data = await res.json();
      if (res.ok && data.password) {
        setRevealedPasswords((prev) => ({ ...prev, [credentialId]: data.password }));
      }
    } catch (err) {
      console.error("Reveal error:", err);
    } finally {
      setLoadingReveal((prev) => ({ ...prev, [credentialId]: false }));
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus((prev) => ({ ...prev, [key]: "copied" }));
    setTimeout(() => {
      setCopyStatus((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }, 2000);
  };

  const handleCopyAll = (item: AccountCredentialItem, password: string) => {
    const credText = `FundedFlex Account Credentials:\nAccount ID: ${item.accountId}\nUsername: ${item.username}\nPassword: ${password}\nServer: ${item.server}\nPlatform: ${item.platform}`;
    handleCopy(credText, `${item.id}-all`);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="space-y-10">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#090D0F] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E599]/5 rounded-full blur-3xl pointer-events-none" />

        <div>
          <span className="text-xs font-semibold text-[#00E599] uppercase tracking-widest block">
            Trader Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Welcome to FundedFlex, {user.name}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Logged in as <span className="text-zinc-200 font-mono">{user.email}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/accounts"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00E599] hover:bg-[#00c784] text-black font-extrabold text-xs shadow-glow-green-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Challenge</span>
          </Link>
          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SECTION 1: ACTIVE ACCOUNTS */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#00E599]" />
              Active Simulated Accounts
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Your provisioned evaluation credentials and institutional demo accounts.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-white/5">
            {credentials.length} Active Account{credentials.length !== 1 ? "s" : ""}
          </span>
        </div>

        {credentials.length === 0 ? (
          <div className="rounded-2xl bg-[#080C0E] border border-white/10 p-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-white/5 text-zinc-500 flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">No active accounts yet</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              You have not purchased an evaluation tier yet or your submitted payment is currently in review.
            </p>
            <Link
              href="/accounts"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00E599] text-black text-xs font-bold shadow-glow-green-sm hover:bg-[#00c784] transition-all"
            >
              <span>Explore Account Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {credentials.map((item) => {
              const isRevealed = Boolean(revealedPasswords[item.id]);
              const rawPassword = revealedPasswords[item.id] || "••••••••••••";
              const isLoading = loadingReveal[item.id];

              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#080C0E] border border-white/10 p-6 shadow-xl relative overflow-hidden space-y-6 hover:border-[#00E599]/30 transition-all group"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#00E599]">
                        FUNDEDFLEX ACCOUNT
                      </span>
                      <h3 className="text-lg font-extrabold text-white mt-0.5">
                        ${item.initialBalance.toLocaleString()} SIMULATED ACCOUNT
                      </h3>
                      <span className="text-[11px] text-zinc-400">
                        {item.order.product.name}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
                      ACTIVE
                    </span>
                  </div>

                  {/* Credentials Fields */}
                  <div className="space-y-3 text-xs bg-[#050707] p-4 rounded-xl border border-white/5 font-mono">
                    {/* Account ID */}
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Account ID:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{item.accountId}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.accountId, `${item.id}-aid`)}
                          className="text-zinc-400 hover:text-white p-1 rounded"
                          title="Copy Account ID"
                        >
                          {copyStatus[`${item.id}-aid`] ? (
                            <Check className="w-3.5 h-3.5 text-[#00E599]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Username */}
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Username:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{item.username}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.username, `${item.id}-usr`)}
                          className="text-zinc-400 hover:text-white p-1 rounded"
                          title="Copy Username"
                        >
                          {copyStatus[`${item.id}-usr`] ? (
                            <Check className="w-3.5 h-3.5 text-[#00E599]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Password:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-200 tracking-wider font-bold">
                          {rawPassword}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRevealPassword(item.id)}
                          disabled={isLoading}
                          className="text-zinc-400 hover:text-white p-1 rounded"
                          title={isRevealed ? "Hide Password" : "Show Password"}
                        >
                          {isRevealed ? (
                            <EyeOff className="w-3.5 h-3.5 text-zinc-400" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-[#00E599]" />
                          )}
                        </button>
                        {isRevealed && (
                          <button
                            type="button"
                            onClick={() => handleCopy(rawPassword, `${item.id}-pwd`)}
                            className="text-zinc-400 hover:text-white p-1 rounded"
                            title="Copy Password"
                          >
                            {copyStatus[`${item.id}-pwd`] ? (
                              <Check className="w-3.5 h-3.5 text-[#00E599]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Server */}
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Server:</span>
                      <span className="text-zinc-300">{item.server}</span>
                    </div>

                    {/* Platform */}
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Platform:</span>
                      <span className="text-zinc-300">{item.platform}</span>
                    </div>
                  </div>

                  {/* Quick Copy All Credentials CTA */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={async () => {
                        let pwd = revealedPasswords[item.id];
                        if (!pwd) {
                          const res = await fetch("/api/credentials/reveal", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ credentialId: item.id }),
                          });
                          const data = await res.json();
                          pwd = data.password || "";
                        }
                        handleCopyAll(item, pwd);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
                    >
                      {copyStatus[`${item.id}-all`] ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#00E599]" />
                          <span>Credentials Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Full Credentials</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Metadata footer */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                    <span>Order #{item.order.orderNumber}</span>
                    <span>Provisioned {new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 2: ORDER HISTORY */}
      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            Order & Payment History
          </h2>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-zinc-500">No order records found.</p>
        ) : (
          <div className="rounded-2xl bg-[#080C0E] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#050707] text-zinc-400 border-b border-white/10 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Order Number</th>
                    <th className="px-6 py-4">Challenge Tier</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Crypto Asset</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Receipt / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-white">
                        {ord.orderNumber}
                      </td>
                      <td className="px-6 py-4">{ord.product.name}</td>
                      <td className="px-6 py-4 font-mono">${ord.amountUSD} USD</td>
                      <td className="px-6 py-4 font-mono text-zinc-400">
                        {ord.cryptoAsset} ({ord.network})
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            ord.status === "ACCOUNT_READY" || ord.status === "PAYMENT_CONFIRMED"
                              ? "bg-[#00E599]/10 text-[#00E599] border-[#00E599]/20"
                              : ord.status === "PAYMENT_PENDING_REVIEW"
                              ? "bg-[#00E599]/10 text-[#00E599] border-[#00E599]/20"
                              : ord.status === "PAYMENT_REJECTED"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-zinc-800 text-zinc-300 border-white/10"
                          }`}
                        >
                          {ord.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-500">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/payment/${ord.id}`}
                          className="inline-flex items-center gap-1 text-[#00E599] hover:underline font-semibold"
                        >
                          <span>View Details</span>
                          <ExternalLink className="w-3 h-3" />
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
    </div>
  );
}
