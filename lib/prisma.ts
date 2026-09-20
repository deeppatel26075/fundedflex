import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// Fallback environment variables if not configured in deployment dashboard
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
}

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "fundedflex_jwt_ultra_secure_secret_token_2026";
}

if (!process.env.CREDENTIALS_ENCRYPTION_KEY) {
  process.env.CREDENTIALS_ENCRYPTION_KEY =
    "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
}

// In Vercel serverless functions, the root deployment directory is read-only.
// We copy prisma/dev.db to /tmp/dev.db so both reads and writes work seamlessly.
if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
  const tmpDbPath = "/tmp/dev.db";
  const sourceDbPath = path.join(process.cwd(), "prisma", "dev.db");

  if (!fs.existsSync(tmpDbPath)) {
    if (fs.existsSync(sourceDbPath)) {
      try {
        fs.copyFileSync(sourceDbPath, tmpDbPath);
      } catch (err) {
        console.error("Failed to copy database to /tmp:", err);
      }
    }
  }

  if (fs.existsSync(tmpDbPath)) {
    process.env.DATABASE_URL = `file:${tmpDbPath}`;
  }
}

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
