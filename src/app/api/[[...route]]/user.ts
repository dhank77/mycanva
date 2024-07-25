import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import bcrypt from "bcryptjs";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono().post(
  "/register",
  zValidator("json", z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(32),
  })),
  async (c) => {
    let data = c.req.valid("json");
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.select()
                        .from(users)
                        .where(eq(users.email, data.email));
    if (user) {
      return c.json({ errors: "User already exists" }, 400);
    }

    await db.insert(users).values(data);
    return c.json(null, 200);
  }
);

export default app;
