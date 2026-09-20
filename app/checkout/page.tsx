import React from "react";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import CheckoutClient from "./CheckoutClient";

export const revalidate = 0;

interface PageProps {
  searchParams: {
    plan?: string;
  };
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();

  // Fetch all active products
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  // Fetch all active payment methods
  const paymentMethods = await prisma.paymentMethod.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const selectedPlanSlug = searchParams.plan || "50k-pro";
  const defaultProduct =
    products.find((p) => p.slug === selectedPlanSlug) || products[0];

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
            Instant Crypto Settlement
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            FundedFlex Evaluation Checkout
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Non-custodial cryptocurrency checkout. Select your asset, scan the QR code, and submit your transaction hash.
          </p>
        </div>

        <CheckoutClient
          products={products}
          paymentMethods={paymentMethods}
          defaultProduct={defaultProduct}
          initialUser={user}
        />
      </div>
    </div>
  );
}
