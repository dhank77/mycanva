import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createProjectSchema, projects } from "@/db/schema";
import { db } from "@/db/drizzle";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

const app = new Hono()
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const auth = c.get("authUser");
    const { id } = c.req.param();

    if (!auth.token?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)));

    if (data.length <= 0) {
      return c.json({ error: "Project not found" }, 404);
    }

    return c.json({ data: data[0] });
  })
  .post(
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
