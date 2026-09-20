import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const rejectSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  rejectionReason: z.string().min(5, "A descriptive rejection reason is required"),
});

export async function POST(request: Request) {
  try {
    const admin = await getCurrentUser();
    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const body = await request.json();
    const result = rejectSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0]?.message || "Invalid input" }, { status: 400 });
    }

    const { orderId, rejectionReason } = result.data;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: {
          status: "PAYMENT_REJECTED",
          rejectionReason: rejectionReason.trim(),
          updatedAt: new Date(),
        },
      }),

      prisma.auditLog.create({
        data: {
          adminId: admin.id,
          action: "REJECT_PAYMENT",
          entity: "Order",
          entityId: order.id,
          metadata: JSON.stringify({
            orderNumber: order.orderNumber,
            rejectionReason,
            txHash: order.txHash,
          }),
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Order payment has been marked as rejected.",
    });
  } catch (error) {
    console.error("Reject order error:", error);
    return NextResponse.json({ error: "Failed to reject payment" }, { status: 500 });
  }
}
