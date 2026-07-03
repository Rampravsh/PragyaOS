import jwt from "jsonwebtoken";
import { config } from "../../config";
import { TokenPayload } from "./auth.types";
import { AppError } from "../../common/errors/appError";

/**
 * Signs a short-lived JWT access token.
 */
export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn as any,
  });
}

/**
 * Signs a longer-lived JWT refresh token.
 */
export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn as any,
  });
}

/**
 * Decodes and verifies a JWT access token, throwing an Unauthorized error on failures.
 */
export function verifyAccessToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, config.jwt.secret) as TokenPayload;
  } catch (err) {
    throw AppError.unauthorized("Access token is invalid or expired.");
  }
}

/**
 * Decodes and verifies a JWT refresh token, throwing an Unauthorized error on failures.
 */
export function verifyRefreshToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, config.jwt.refreshSecret) as TokenPayload;
  } catch (err) {
    throw AppError.unauthorized("Refresh token is invalid or expired.");
  }
}
