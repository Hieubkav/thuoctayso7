import { createHash, randomBytes } from 'crypto';

export function generatePasswordResetToken() {
  const token = randomBytes(32).toString('hex');
  return {
    token,
    hashedToken: hashToken(token),
  };
}

export function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

