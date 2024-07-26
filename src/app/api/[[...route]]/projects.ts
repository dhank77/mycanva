import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createProjectSchema, projects } from "@/db/schema";
import { db } from "@/db/drizzle";
import { verifyAuth } from "@hono/auth-js";

const app = new Hono().post(
   "/",
   zValidator(
      "json",
      createProjectSchema.pick({
         name: true,
         json: true,
         width: true,
         height: true,
      })
   ),
   async (c) => {
      const auth = c.get("authUser");
      const data = c.req.valid("json");

      if (!auth.token?.id) {
         return c.json({ error: "Unauthorized" }, 401);
      }

      const resData = await db
         .insert(projects)
         .values({
            ...data,
            userId: auth.token.id,
            createdAt: new Date(),
            updatedAt: new Date(),
         })
         .returning();

      if (!resData[0]) {
         return c.json({ error: "Something went wrong" }, 400);
      }

      return c.json({ data: resData[0] });
   }
);

export default app;
