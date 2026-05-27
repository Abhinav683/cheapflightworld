import crypto from "crypto";
import bcryptjs from "bcryptjs";

const COOKIE_SECRET =
  process.env.ADMIN_COOKIE_SECRET || "default_secret";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days



export async function hashPassword(password: string) {
  return bcryptjs.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
) {
  return bcryptjs.compare(password, hash);
}



export function createAdminSessionToken(userId: string) {
  const issuedAt = Math.floor(Date.now() / 1000);

  const payload = `${userId}:${issuedAt}`;

  const signature = crypto
    .createHmac("sha256", COOKIE_SECRET)
    .update(payload)
    .digest("hex");

  return `${payload}:${signature}`;
}

export function verifyAdminSessionToken(token: string) {
  try {
    const [userId, issuedAt, signature] = token.split(":");
    if (!userId || !issuedAt || !signature) return null;

    const payload = `${userId}:${issuedAt}`;

    const expected = crypto
      .createHmac("sha256", COOKIE_SECRET)
      .update(payload)
      .digest("hex");

    if (expected.length !== signature.length) return null;

    if (
      !crypto.timingSafeEqual(
        Buffer.from(expected),
        Buffer.from(signature)
      )
    ) {
      return null;
    }

    const issued = Number(issuedAt);

    const isExpired =
      issued + SESSION_MAX_AGE <
      Math.floor(Date.now() / 1000);

    if (isExpired) return null;

    return {
      userId,
      issuedAt: issued,
    };
  } catch {
    return null;
  }
}