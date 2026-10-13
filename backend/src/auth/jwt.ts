import { readFileSync } from "node:fs";
import { createPrivateKey, randomUUID, type KeyObject } from "node:crypto";
import { SignJWT } from "jose";

export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

let privateKey: KeyObject | undefined;

function getPrivateKey() {
  privateKey ??= createPrivateKey(readFileSync("private.pem"));
  return privateKey;
}

export async function generateAccessToken(userId: string) {
  return new SignJWT({ tokenType: "access" })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(getPrivateKey());
}

export async function generateRefreshToken(userId: string) {
  return new SignJWT({ tokenType: "refresh" })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setSubject(userId)
    .setJti(randomUUID())
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getPrivateKey());
}
