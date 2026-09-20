import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const updatePaymentMethodSchema = z.object({
  id: z.string().min(1),
  walletAddress: z.string().min(10, "Valid wallet address is required"),
  instructions: z.string().optional(),
  isActive: z.boolean(),
});

export async function POST(request: Request) {
  try {
    const admin = await getCurrentUser();
    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const result = updatePaymentMethodSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0]?.message || "Invalid input" }, { status: 400 });
    }

    const { id, walletAddress, instructions, isActive } = result.data;

    const updated = await prisma.paymentMethod.update({
      where: { id },
      data: {
        walletAddress: walletAddress.trim(),
        instructions: instructions || null,
        isActive,
      },
    });

    await prisma.auditLog.create({
      data: {
        adminId: admin.id,
        action: "UPDATE_PAYMENT_METHOD_WALLET",
        entity: "PaymentMethod",
        entityId: id,
        metadata: JSON.stringify({ walletAddress, isActive }),
      },
    });

    return NextResponse.json({ success: true, paymentMethod: updated });
  } catch (error) {
    console.error("Update payment method error:", error);
    return NextResponse.json({ error: "Failed to update payment method" }, { status: 500 });
  }
}
