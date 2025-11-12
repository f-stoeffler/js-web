// comps/AuthStatus.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LoginButton from "./LoginButton";

export default async function AuthStatus() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    console.log('✅ User is authenticated:', session.user);
  } else {
    console.error('❌ User is not authenticated');
  }

  return <LoginButton />;
}