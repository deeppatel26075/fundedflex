import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import DashboardClient from "./DashboardClient";

export const revalidate = 0;

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?redirect=/dashboard");
  }

  // Fetch user's active account credentials
  const credentials = await prisma.accountCredential.findMany({
    where: { userId: user.id },
    include: {
      order: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Fetch recent orders
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardClient
          user={user}
          credentials={JSON.parse(JSON.stringify(credentials))}
          orders={JSON.parse(JSON.stringify(orders))}
        />
      </div>
    </div>
  );
}
