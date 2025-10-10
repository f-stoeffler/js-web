"use server";

import { checkIfUserIsAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const isAdmin = await checkIfUserIsAdmin();

  if (!isAdmin) redirect("/unauthorized");
  return (
    <div className="">
      <main className="flex justify-center items-center my-8">test</main>
    </div>
  );
}
