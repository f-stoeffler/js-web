// lib/auth.ts
import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ALLOWED_EMAILS = [
  "admin@yourdomain.com",
  "your-personal@gmail.com",
];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if the user's email is in the allowed list
      if (user.email && ALLOWED_EMAILS.includes(user.email)) {
        return true;
      }
      
      // Or check by domain (allows any email from your domain)
      // if (user.email && user.email.endsWith('@yourcompany.com')) {
      //   return true;
      // }
      
      // Return false to display a default error message
      return '/unauthorized';
      
      // Or redirect to custom error page
      // return '/unauthorized';
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