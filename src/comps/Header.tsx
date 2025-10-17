"use server";
import Image from "next/image";
import NavbarItem from "./NavbarItem";
import Link from "next/link";
import { checkIfUserIsAdmin } from "@/lib/auth";

export default async function Header() {
  const isAdmin = await checkIfUserIsAdmin();
  return (
    <div className="w-full shadow-md border-b-2 border-prim">
      <div className="md:container mx-auto">
        <div className="flex md:h-16 mx-2 md:mx-6 flex-col md:flex-row">
          <div className=" font-black flex items-center">
            <Link href="/" className="mx-auto md:mx-0 mt-4 md:mt-0">
              <Image src="/showtech.png" width={300} height={80} alt="Logo" />
            </Link>
          </div>
          <div className=" flex justify-center md:justify-end h-full w-full">
            {isAdmin && <><NavbarItem url="/api/auth/signout" isAdmin={true}>Adminmodus verlassen</NavbarItem>
              <NavbarItem url="/admin-dashboard" isAdmin={true}>Admin Dashboard</NavbarItem></>}
            <NavbarItem url="/#projects">Leistungen</NavbarItem>
            <NavbarItem url="mailto:julius.stoeffler@gmail.com">Kontakt</NavbarItem>
          </div>
        </div>
      </div>
    </div>
  );
}
