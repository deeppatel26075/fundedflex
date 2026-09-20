import React from "react";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import OrderReviewClient from "./OrderReviewClient";

export const revalidate = 0;

interface PageProps {
  params: {
    id: string;
  };
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login?redirect=/admin");
  }

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      product: true,
      credential: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <OrderReviewClient initialOrder={JSON.parse(JSON.stringify(order))} />
      </div>
    </div>
  );
}
