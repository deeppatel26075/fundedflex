import React from "react";
import prisma from "@/lib/prisma";
import AccountMarketplace from "@/components/AccountMarketplace";
import TrustStrip from "@/components/TrustStrip";
import RulesMatrix from "@/components/RulesMatrix";

export const revalidate = 0;

export default async function AccountsPage() {
  const rawProducts = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const products = rawProducts.map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    accountSize: p.accountSize,
    priceUSD: p.priceUSD,
    dailyDrawdown: p.dailyDrawdown,
    maxDrawdown: p.maxDrawdown,
    leverage: p.leverage,
    profitTarget: p.profitTarget,
    tradingPeriod: p.tradingPeriod,
    minTradingDays: p.minTradingDays,
    rewardSplit: p.rewardSplit,
    weekendHolding: p.weekendHolding,
    newsTrading: p.newsTrading,
    eaTrading: p.eaTrading,
    isFeatured: p.isFeatured,
  }));

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#00E599]">
          Evaluation Catalog
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2">
          Select Your Simulated Account Size
        </h1>
        <p className="mt-3 text-base text-zinc-400 max-w-2xl mx-auto">
          Choose from $5,000 to $200,000 simulated trading challenges. Static drawdown ceilings, 1:100 leverage, and instant crypto processing.
        </p>
      </div>

      <TrustStrip />
      <AccountMarketplace products={products} />
      <RulesMatrix />
    </div>
  );
}
