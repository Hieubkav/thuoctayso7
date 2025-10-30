import { compare, hash } from "bcryptjs";

const SALT_ROUNDS = 12;

export async function hashPassword(plain: string) {
  return hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(plain: string, hashed: string) {
  return compare(plain, hashed);
}

