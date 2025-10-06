// lib/auth.ts
import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ALLOWED_EMAILS = process.env.ALLOWED_EMAILS?.split(',') || [];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user.email && ALLOWED_EMAILS.includes(user.email)) {
        return true;
      }
      return '/unauthorized';
    },
    async session({ session, token }) {
      return session;
    },
  },
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}