import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import PaymentMethodsClient from "./PaymentMethodsClient";

export const revalidate = 0;

export default async function AdminPaymentMethodsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login?redirect=/admin/payment-methods");
  }

  const paymentMethods = await prisma.paymentMethod.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Command Center</span>
          </Link>
        </div>

        <PaymentMethodsClient initialMethods={JSON.parse(JSON.stringify(paymentMethods))} />
      </div>
    </div>
  );
}
