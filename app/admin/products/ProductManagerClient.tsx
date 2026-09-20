"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Check, Layers, AlertCircle, Loader2 } from "lucide-react";

interface ProductData {
  id: string;
  name: string;
  slug: string;
  accountSize: number;
  priceUSD: number;
  dailyDrawdown: number;
  maxDrawdown: number;
  leverage: string;
  isActive: boolean;
}

export default function ProductManagerClient({
  initialProducts,
}: {
  initialProducts: ProductData[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleFieldChange = (id: string, field: keyof ProductData, val: any) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  const handleSave = async (prod: ProductData) => {
    setSavingId(prod.id);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/admin/products/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: prod.id,
          priceUSD: Number(prod.priceUSD),
          dailyDrawdown: Number(prod.dailyDrawdown),
          maxDrawdown: Number(prod.maxDrawdown),
          leverage: prod.leverage,
          isActive: prod.isActive,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Update failed");
      }

      setSuccessMsg(`Saved changes for ${prod.name}!`);
      setTimeout(() => setSuccessMsg(null), 3000);
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update product");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="rounded-3xl bg-[#090D0F] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#F59E0B]" />
            Product Tiers & Central Rules Configurator
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure evaluation prices, daily loss limits (default 5%), maximum drawdowns (default 10%), and leverage directly in the database.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#F59E0B] text-xs flex items-center gap-2">
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
        {products.map((prod) => {
          const isSaving = savingId === prod.id;
          return (
            <div
              key={prod.id}
              className="p-5 rounded-2xl bg-[#050707] border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center text-xs"
            >
              {/* Name & Size */}
              <div className="lg:col-span-2">
                <span className="text-white font-bold text-sm block">{prod.name}</span>
                <span className="text-zinc-500 font-mono">
                  ${prod.accountSize.toLocaleString()} Capital ({prod.slug})
                </span>
              </div>

              {/* Price */}
              <div>
                <label className="text-zinc-500 block mb-1 text-[11px]">Price ($USD)</label>
                <input
                  type="number"
                  value={prod.priceUSD}
                  onChange={(e) =>
                    handleFieldChange(prod.id, "priceUSD", parseFloat(e.target.value))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-white/10 text-white font-mono"
                />
              </div>

              {/* Daily Drawdown */}
              <div>
                <label className="text-zinc-500 block mb-1 text-[11px]">Daily DD (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={prod.dailyDrawdown}
                  onChange={(e) =>
                    handleFieldChange(prod.id, "dailyDrawdown", parseFloat(e.target.value))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-white/10 text-white font-mono"
                />
              </div>

              {/* Max Drawdown */}
              <div>
                <label className="text-zinc-500 block mb-1 text-[11px]">Max DD (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={prod.maxDrawdown}
                  onChange={(e) =>
                    handleFieldChange(prod.id, "maxDrawdown", parseFloat(e.target.value))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0E1315] border border-white/10 text-white font-mono"
                />
              </div>

              {/* Action */}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleSave(prod)}
                  disabled={isSaving}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-black font-extrabold text-xs shadow-glow-gold-sm flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Save</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
