import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const submitPaymentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  txHash: z.string().min(8, "Valid transaction hash or payment reference is required"),
  paymentProof: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = submitPaymentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Invalid payment details" },
        { status: 400 }
      );
    }

    const { orderId, txHash, paymentProof } = result.data;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check if order is already confirmed
    if (order.status === "PAYMENT_CONFIRMED" || order.status === "ACCOUNT_READY") {
      return NextResponse.json({
        success: true,
        status: order.status,
        message: "Order has already been confirmed and provisioned",
      });
    }

    // Update order strictly to PAYMENT_PENDING_REVIEW
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        txHash: txHash.trim(),
        paymentProof: paymentProof || null,
        status: "PAYMENT_PENDING_REVIEW",
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      status: updatedOrder.status,
      message: "Payment submitted successfully. Your transaction is being reviewed by the FundedFlex desk.",
    });
  } catch (error) {
    console.error("Submit payment error:", error);
    return NextResponse.json(
      { error: "Failed to submit payment details" },
      { status: 500 }
    );
  }
}
