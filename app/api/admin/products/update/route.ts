import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const updateProductSchema = z.object({
  id: z.string().min(1),
  priceUSD: z.number().min(1),
  dailyDrawdown: z.number().min(0.5).max(50),
  maxDrawdown: z.number().min(1).max(50),
  leverage: z.string().min(1),
  isActive: z.boolean(),
});

export async function POST(request: Request) {
  try {
    const admin = await getCurrentUser();
    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const result = updateProductSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0]?.message || "Invalid input" }, { status: 400 });
    }

    const { id, priceUSD, dailyDrawdown, maxDrawdown, leverage, isActive } = result.data;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        priceUSD,
        dailyDrawdown,
        maxDrawdown,
        leverage,
        isActive,
      },
    });

    await prisma.auditLog.create({
      data: {
        adminId: admin.id,
        action: "UPDATE_PRODUCT_RULES",
        entity: "Product",
        entityId: id,
        metadata: JSON.stringify({ priceUSD, dailyDrawdown, maxDrawdown, leverage, isActive }),
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
