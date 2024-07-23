import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import Github from "next-auth/providers/github";

const pool = new Pool({
   connectionString: process.env.DATABASE_URL!,
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [Github]
});
