import { Hono } from "hono";
import { handle } from "hono/vercel";
import user from "./user";
import images from "./images";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const route = app
    .route("/user", user)
    .route("/images", images)

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof route;