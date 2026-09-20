import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import PaymentStatusClient from "./PaymentStatusClient";

export const revalidate = 0;

interface PageProps {
  params: {
    orderId: string;
  };
}

export default async function PaymentPage({ params }: PageProps) {
  const { orderId } = params;
  const user = await getCurrentUser();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      product: true,
      credential: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <PaymentStatusClient initialOrder={JSON.parse(JSON.stringify(order))} isOwnerOrAdmin={Boolean(user && (user.id === order.userId || user.role === "ADMIN"))} />
      </div>
    </div>
  );
}
