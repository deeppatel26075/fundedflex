import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import {
  generateAccountId,
  generateUsername,
  generateSecurePassword,
  encryptCredential,
} from "@/lib/crypto-security";

const approveSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  adminNotes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const admin = await getCurrentUser();
    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 403 });
    }

    const body = await request.json();
    const result = approveSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0]?.message || "Invalid input" }, { status: 400 });
    }

    const { orderId, adminNotes } = result.data;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { product: true, user: true, credential: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.credential) {
      return NextResponse.json({
        success: true,
        message: "Order already has provisioned credentials",
        accountId: order.credential.accountId,
      });
    }

    // 1. Generate unique account ID & username
    let accountId = generateAccountId();
    // Ensure uniqueness
    let attempts = 0;
    while (await prisma.accountCredential.findUnique({ where: { accountId } })) {
      accountId = generateAccountId();
      attempts++;
      if (attempts > 10) break;
    }

    const username = generateUsername(accountId);
    const rawSecurePassword = generateSecurePassword(12);
    const encryptedPassword = encryptCredential(rawSecurePassword);

    // 2. Perform atomic database updates
    const [updatedOrder, credential, audit] = await prisma.$transaction([
      // Update order status
      prisma.order.update({
        where: { id: orderId },
        data: {
          status: "ACCOUNT_READY",
          adminNotes: adminNotes || "Payment verified on-chain and approved by administrator.",
          approvedAt: new Date(),
        },
      }),

      // Create secure account credentials
      prisma.accountCredential.create({
        data: {
          orderId: order.id,
          userId: order.userId,
          accountId,
          username,
          encryptedPassword,
          server: "FundedFlex-Live-Sim01",
          platform: "FundedFlex Client Terminal / MT5",
          initialBalance: order.product.accountSize,
          status: "ACTIVE",
        },
      }),

      // Record administrative audit log
      prisma.auditLog.create({
        data: {
          adminId: admin.id,
          action: "APPROVE_PAYMENT_AND_PROVISION",
          entity: "Order",
          entityId: order.id,
          metadata: JSON.stringify({
            orderNumber: order.orderNumber,
            accountId,
            amountUSD: order.amountUSD,
            cryptoAsset: order.cryptoAsset,
            txHash: order.txHash,
          }),
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Payment approved and account credentials generated successfully!",
      credential: {
        accountId: credential.accountId,
        username: credential.username,
        rawPassword: rawSecurePassword, // returned once to admin modal for instant verification
        initialBalance: credential.initialBalance,
        server: credential.server,
      },
    });
  } catch (error) {
    console.error("Approve order error:", error);
    return NextResponse.json({ error: "Failed to approve payment" }, { status: 500 });
  }
}
