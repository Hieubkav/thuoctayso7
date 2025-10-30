import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { adminUsers, type AdminUser } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";

interface CreateAdminUserInput {
  email: string;
  password: string;
  fullName: string;
  role?: AdminUser["role"];
}

export async function getAdminByEmail(email: string) {
  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email.toLowerCase()))
    .limit(1);
  return user ?? null;
}

export async function createAdminUser({ email, password, fullName, role = "editor" }: CreateAdminUserInput) {
  const hashedPassword = await hashPassword(password);
  const [user] = await db
    .insert(adminUsers)
    .values({
      email: email.toLowerCase(),
      passwordHash: hashedPassword,
      fullName,
      role,
    })
    .returning();

  return user;
}

export async function updateAdminLastLogin(id: string) {
  await db
    .update(adminUsers)
    .set({ lastLoginAt: new Date() })
    .where(eq(adminUsers.id, id));
}
