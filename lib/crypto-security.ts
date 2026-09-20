import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const SECRET_KEY =
  process.env.CREDENTIALS_ENCRYPTION_KEY ||
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

/**
 * Generate a unique FundedFlex account ID e.g. FF-739284
 */
export function generateAccountId(): string {
  const randomNum = crypto.randomInt(100000, 999999);
  return `FF-${randomNum}`;
}

/**
 * Generate username matching account ID e.g. FF739284
 */
export function generateUsername(accountId: string): string {
  return accountId.replace("-", "");
}

/**
 * Generate a cryptographically secure random password
 * Meets standard institutional password requirements:
 * at least 1 uppercase, 1 lowercase, 1 number, 1 special character
 */
export function generateSecurePassword(length: number = 12): string {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const numbers = "23456789";
  const symbols = "!@#$%^&*()_+~=";

  const allChars = upper + lower + numbers + symbols;

  // Guarantee at least one from each class
  let password = [
    upper[crypto.randomInt(0, upper.length)],
    lower[crypto.randomInt(0, lower.length)],
    numbers[crypto.randomInt(0, numbers.length)],
    symbols[crypto.randomInt(0, symbols.length)],
  ];

  // Fill remaining characters
  for (let i = password.length; i < length; i++) {
    password.push(allChars[crypto.randomInt(0, allChars.length)]);
  }

  // Shuffle array using Fisher-Yates with crypto random
  for (let i = password.length - 1; i > 0; i--) {
    const j = crypto.randomInt(0, i + 1);
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join("");
}

/**
 * Encrypt sensitive credentials using AES-256-GCM
 */
export function encryptCredential(plainText: string): string {
  const iv = crypto.randomBytes(12);
  const key = Buffer.from(SECRET_KEY.slice(0, 64), "hex");
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  // Format: iv:authTag:encrypted
  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

/**
 * Decrypt sensitive credentials
 */
export function decryptCredential(encryptedData: string): string {
  try {
    const [ivHex, authTagHex, encryptedHex] = encryptedData.split(":");
    if (!ivHex || !authTagHex || !encryptedHex) {
      throw new Error("Invalid encrypted format");
    }

    const key = Buffer.from(SECRET_KEY.slice(0, 64), "hex");
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      key,
      Buffer.from(ivHex, "hex")
    );

    decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Decryption failure:", error);
    return "••••••••••••";
  }
}
