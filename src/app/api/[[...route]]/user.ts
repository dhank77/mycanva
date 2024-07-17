import { Hono } from "hono";

const app = new Hono()
    .get("/", async (c) => {
        return c.json({ name: "hono test endpoint" });
    });

export default app;
