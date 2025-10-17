// lib/auth.ts
import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

const ALLOWED_EMAILS = process.env.ALLOWED_EMAILS?.split(",") || [];

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
      return "/unauthorized";
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

export async function checkIfUserIsAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) return false

  const ALLOWED_EMAILS = process.env.ALLOWED_EMAILS?.split(",") || [];
  const isAdmin = session?.user?.email
    ? ALLOWED_EMAILS.includes(session.user.email)
    : false;
  if (!isAdmin) redirect("/api/auth/signout")
  return isAdmin;
}

export async function forceSignoutIfNotAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/unauthorized")

  const ALLOWED_EMAILS = process.env.ALLOWED_EMAILS?.split(",") || [];
  const isAdmin = session?.user?.email
    ? ALLOWED_EMAILS.includes(session.user.email)
    : false;
  if (!isAdmin) redirect("/api/auth/signout")
  return isAdmin;
}

// lib/auth-utils.ts
export function withAdminAuth<Args extends unknown[], Return>(
  fn: (...args: Args) => Promise<Return>
) {
  return async (...args: Args): Promise<Return> => {
    await forceSignoutIfNotAdmin();
    return fn(...args);
  };
}