import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/lib/env";
import * as schema from "./schema";

const databaseUrl = env.DATABASE_URL_UNPOOLED ?? env.DATABASE_URL;
const client = neon(databaseUrl);

export const db = drizzle(client, {
  schema,
  logger: process.env.NODE_ENV === "development",
});

export type { schema };

