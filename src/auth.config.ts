import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

export const authConfig: NextAuthConfig = {
   providers: [GitHub],
   session: { strategy: "jwt" },
} satisfies NextAuthConfig;

export const authMiddleware = NextAuth(authConfig);
