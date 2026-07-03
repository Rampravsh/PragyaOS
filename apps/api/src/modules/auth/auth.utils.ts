import bcrypt from "bcrypt";
import crypto from "crypto";
import { AUTH_CONSTANTS } from "./auth.constants";

/**
 * Encrypts a plain-text password using bcrypt.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, AUTH_CONSTANTS.SALT_ROUNDS);
}

/**
 * Verifies a plain password matches its stored bcrypt hash.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Computes a SHA-256 hexadecimal hash of a token string.
 * Used to store secure digests in the database rather than plain tokens.
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Generates a cryptographically secure random token string.
 */
export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString("hex");
}
