"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Check, Wallet, AlertCircle, Loader2 } from "lucide-react";

interface PaymentMethodItem {
  id: string;
  asset: string;
  network: string;
  walletAddress: string;
  instructions: string | null;
  isActive: boolean;
}

export default function PaymentMethodsClient({
  initialMethods,
}: {
  initialMethods: PaymentMethodItem[];
}) {
  const [methods, setMethods] = useState(initialMethods);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleFieldChange = (id: string, field: keyof PaymentMethodItem, val: any) => {
    setMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: val } : m))
    );
  };

  const handleSave = async (m: PaymentMethodItem) => {
    setSavingId(m.id);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/admin/payment-methods/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: m.id,
          walletAddress: m.walletAddress,
          instructions: m.instructions,
          isActive: m.isActive,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Update failed");
      }

      setSuccessMsg(`Updated address for ${m.asset} (${m.network})!`);
      setTimeout(() => setSuccessMsg(null), 3000);
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update payment method");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="rounded-3xl bg-[#090D0F] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Wallet className="w-6 h-6 text-[#00E599]" />
          Configured Crypto Payment Wallets
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Set your official wallet deposit addresses and transfer guidelines for USDT, USDC, BTC, and ETH.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-[#00E599]/10 border border-[#00E599]/20 text-[#00E599] text-xs flex items-center gap-2">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-4">
        {methods.map((m) => {
          const isSaving = savingId === m.id;
          return (
            <div
              key={m.id}
              className="p-5 rounded-2xl bg-[#050707] border border-white/10 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">
                    {m.asset}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 font-mono text-[10px]">
                    {m.network}
                  </span>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={m.isActive}
                    onChange={(e) =>
                      handleFieldChange(m.id, "isActive", e.target.checked)
                    }
                    className="rounded bg-zinc-800 border-zinc-700 text-[#00E599] focus:ring-0"
                  />
                  <span className="text-xs text-zinc-400">Accept Payments</span>
                </label>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 text-[11px] font-semibold">
                  Official Deposit Wallet Address
                </label>
                <input
                  type="text"
                  value={m.walletAddress}
                  onChange={(e) =>
                    handleFieldChange(m.id, "walletAddress", e.target.value)
                  }
                  placeholder="Paste your crypto wallet address"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1315] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#00E599]"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 text-[11px]">
                  Special Payment Instructions / Warning
                </label>
                <input
                  type="text"
                  value={m.instructions || ""}
                  onChange={(e) =>
                    handleFieldChange(m.id, "instructions", e.target.value)
                  }
                  placeholder="e.g. Minimum 1 confirmation. Send only via TRON network."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0E1315] border border-white/10 text-zinc-300 text-xs focus:outline-none focus:border-[#00E599]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => handleSave(m)}
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-[#00E599] hover:bg-[#00c784] text-black font-bold text-xs shadow-glow-green-sm flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Save Wallet</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
