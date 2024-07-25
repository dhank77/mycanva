import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import user from "./user";
import images from "./images";
import {
  type AuthConfig,
  initAuthConfig,
  verifyAuth,
} from "@hono/auth-js";
import authConfig from "@/auth.config";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
}
app.use("*", initAuthConfig(getAuthConfig));

app.use("*", async (c, next) => {
  if (c.req.path.startsWith("/api/user")) {
    return next();
  } else {
    await verifyAuth()(c, next);
  }
});

const route = app.route("/user", user).route("/images", images);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof route;
