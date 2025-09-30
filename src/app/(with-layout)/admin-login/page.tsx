"use server";
import LoginButton from "@/comps/auth/LoginButton";

export default async function AdminLogin() {
  return (
    <div className="">
      <main className="flex justify-center items-center my-8">
        <LoginButton />
      </main>
    </div>
  );
}
