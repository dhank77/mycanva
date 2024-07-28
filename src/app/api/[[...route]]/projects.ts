import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createProjectSchema, projects } from "@/db/schema";
import { db } from "@/db/drizzle";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

const app = new Hono()
   .get("/cv", async (c) => {
      const data = await db
         .select()
         .from(projects)
         .where(eq(projects.id, "3244bdb9-3e51-49ac-b8d0-c31fe9ae6c6e"));

      if (data.length <= 0) {
         return c.json({ error: "Data not found" }, 404);
      }

      return c.json({ data: data[0] });
   })
   .get(
      "/:id",
      zValidator(
         "param",
         z.object({
            id: z.string(),
         })
      ),
      async (c) => {
         const auth = c.get("authUser");
         const { id } = c.req.param();

         if (!auth.token?.id) {
            return c.json({ error: "Unauthorized" }, 401);
         }

         const data = await db
            .select()
            .from(projects)
            .where(
               and(eq(projects.id, id), eq(projects.userId, auth.token.id))
            );

         if (data.length <= 0) {
            return c.json({ error: "Project not found" }, 404);
         }

         return c.json({ data: data[0] });
      }
   )
   .patch(
      "/:id",
      zValidator(
         "param",
         z.object({
            id: z.string(),
         })
      ),
      zValidator(
         "json",
         createProjectSchema
            .omit({
               id: true,
               userId: true,
               createdAt: true,
               updatedAt: true,
            })
            .partial()
      ),
      async (c) => {
         const auth = c.get("authUser");
         const { id } = c.req.valid("param");
         const data = c.req.valid("json");

         if (!auth.token?.id) {
            return c.json({ error: "Unauthorized" }, 401);
         }

         const resData = await db
            .update(projects)
            .set({
               ...data,
               updatedAt: new Date(),
            })
            .where(and(eq(projects.id, id), eq(projects.userId, auth.token.id)))
            .returning();

         if (resData.length <= 0) {
            return c.json({ error: "Project not found" }, 404);
         }

         return c.json({ data: resData[0] });
      }
   )
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
