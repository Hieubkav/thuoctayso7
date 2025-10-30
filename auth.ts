import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { env } from "@/lib/env";
import { verifyPassword } from "@/lib/auth/password";
import { updateAdminLastLogin } from "@/features/auth/data/admin";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [
    Credentials({
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const [user] = await db
          .select()
          .from(adminUsers)
          .where(eq(adminUsers.email, email.toLowerCase()))
          .limit(1);

        if (!user || !user.isActive) {
          return null;
        }

        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        await updateAdminLastLogin(user.id);

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = (token.role as string | undefined) ?? "editor";
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: env.NEXTAUTH_SECRET,
});

export const handlers = { GET, POST };
