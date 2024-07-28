import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db/drizzle";
import { z } from "zod";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

import { JWT } from "next-auth/jwt"; //only for this
declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
  }
}
declare module "@auth/core/jwt" { //only for hono ts error
  interface JWT {
    id: string | undefined;
  }
}

export default {
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validate = CredentialsSchema.safeParse(credentials);

        if (!validate.success) return null;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, validate.data.email));

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          validate.data.password,
          user.password
        );

        if (!isValid) return null;

        return user;
      },
    }),
    Github,
    Google,
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
