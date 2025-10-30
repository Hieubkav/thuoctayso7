import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/lib/db';
import { adminUsers, passwordResetTokens } from '@/lib/db/schema';
import { generatePasswordResetToken, hashToken } from '@/lib/auth/tokens';

const RESET_TOKEN_EXPIRY_MINUTES = 30;

export async function createPasswordResetRequest(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) return null;

  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, normalizedEmail))
    .limit(1);

  if (!user) {
    return null;
  }

  const now = Date.now();
  const expiresAt = new Date(now + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000);
  const { token, hashedToken } = generatePasswordResetToken();

  await db
    .update(passwordResetTokens)
    .set({ usedAt: new Date() })
    .where(and(eq(passwordResetTokens.adminUserId, user.id), isNull(passwordResetTokens.usedAt)));

  await db.insert(passwordResetTokens).values({
    adminUserId: user.id,
    tokenHash: hashedToken,
    expiresAt,
  });

  return {
    token,
    user,
    expiresAt,
  };
}

export async function markTokenAsUsed(tokenId: string) {
  await db
    .update(passwordResetTokens)
    .set({ usedAt: new Date() })
    .where(eq(passwordResetTokens.id, tokenId));
}

export async function validatePasswordResetToken(rawToken: string) {
  const hashed = hashToken(rawToken);

  const [record] = await db
    .select()
    .from(passwordResetTokens)
    .where(and(eq(passwordResetTokens.tokenHash, hashed), isNull(passwordResetTokens.usedAt)))
    .limit(1);

  if (!record) return null;
  if (record.expiresAt.getTime() < Date.now()) {
    await markTokenAsUsed(record.id);
    return null;
  }

  return record;
}

