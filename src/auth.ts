import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id as string);
      if (!existingUser?.emailVerified) return false;
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if(session.user && token.fullname) {
        session.user.fullname = token.fullname;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;
      if (user) {
        token.fullname = user.fullname;
      }
      return token;
    },
  },
});
