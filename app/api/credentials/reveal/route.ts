import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { decryptCredential } from "@/lib/crypto-security";

const revealSchema = z.object({
  credentialId: z.string().min(1, "Credential ID is required"),
});

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = revealSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { credentialId } = result.data;

    const credential = await prisma.accountCredential.findUnique({
      where: { id: credentialId },
    });

    if (!credential) {
      return NextResponse.json({ error: "Credential not found" }, { status: 404 });
    }

    // Ownership guard: user must be the account owner or an admin
    if (credential.userId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const plainPassword = decryptCredential(credential.encryptedPassword);

    return NextResponse.json({
      success: true,
      password: plainPassword,
    });
  } catch (error) {
    console.error("Reveal credential error:", error);
    return NextResponse.json({ error: "Failed to reveal credentials" }, { status: 500 });
  }
}
