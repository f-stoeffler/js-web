// comps/LoginButton.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function LoginButton() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div className="striped-background p-4 rounded-lg shadow-lg">
        <p className="text-sm mb-2">Angemeldet als {session.user?.email}</p>
        <Link 
          href="/api/auth/signout"
          className="bg-red-500 text-white px-3 py-1 rounded text-sm inline-block"
        >
          Abmelden
        </Link>
      </div>
    );
  }

  return (
    <div className="striped-background">
      <Link 
        href="/api/auth/signin"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
      >
        Anmelden mit Google
      </Link>
    </div>
  );
}