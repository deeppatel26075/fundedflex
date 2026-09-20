import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getCurrentUser, hashPassword, createToken, setSessionCookie } from "@/lib/auth";

const createOrderSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  paymentMethodId: z.string().min(1, "Payment method is required"),
  email: z.string().email("Valid email is required"),
  fullName: z.string().min(2, "Full name is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = createOrderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Invalid order input" },
        { status: 400 }
      );
    }

    const { productId, paymentMethodId, email, fullName } = result.data;
    const cleanEmail = email.toLowerCase().trim();

    // 1. Authoritative Product Lookup from DB (prevents tampering)
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.isActive) {
      return NextResponse.json(
        { error: "Selected product is currently unavailable" },
        { status: 404 }
      );
    }

    // 2. Authoritative Payment Method Lookup from DB
    const paymentMethod = await prisma.paymentMethod.findUnique({
      where: { id: paymentMethodId },
    });

    if (!paymentMethod || !paymentMethod.isActive) {
      return NextResponse.json(
        { error: "Selected crypto payment method is not active" },
        { status: 404 }
      );
    }

    // 3. User resolution (logged-in user or automatic trader account creation)
    let currentUser = await getCurrentUser();
    let userId: string;

    if (currentUser) {
      userId = currentUser.id;
    } else {
      let existingUser = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });

      if (!existingUser) {
        // Create user with a secure initial password
        const initialPasswordHash = await hashPassword("FundedFlexTrader2026!");
        existingUser = await prisma.user.create({
          data: {
            email: cleanEmail,
            name: fullName.trim(),
            passwordHash: initialPasswordHash,
            role: "USER",
          },
        });
      }
      userId = existingUser.id;

      // Auto-set session cookie so user can view their order
      const token = createToken({
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role as "USER" | "ADMIN",
      });
      setSessionCookie(token);
    }

    // 4. Calculate expected crypto amount based on asset
    // For USDT & USDC, 1 USD = 1 Token
    // For BTC & ETH, use approximate institutional peg
    let expectedCryptoAmount = product.priceUSD;
    if (paymentMethod.asset === "BTC") {
      expectedCryptoAmount = Number((product.priceUSD / 65000).toFixed(6));
    } else if (paymentMethod.asset === "ETH") {
      expectedCryptoAmount = Number((product.priceUSD / 2650).toFixed(5));
    }

    // 5. Generate unique Order Number e.g. FF-ORD-748291
    const randomOrderSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `FF-ORD-${randomOrderSuffix}`;

    // 6. Create Order in Database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        productId: product.id,
        amountUSD: product.priceUSD,
        cryptoAsset: paymentMethod.asset,
        network: paymentMethod.network,
        walletAddress: paymentMethod.walletAddress,
        expectedCryptoAmount,
        status: "PENDING_PAYMENT",
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Failed to initialize order" },
      { status: 500 }
    );
  }
}
