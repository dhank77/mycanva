import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./db/drizzle";

export const { handlers, auth, signIn, signOut } = NextAuth({
   adapter: DrizzleAdapter(db),
   providers: [Github, Google],
   pages: {
      signIn: "/login",
      error: "/login",
   },
});
