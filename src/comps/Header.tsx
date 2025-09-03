"use server";
import { getFrontPage } from "@/repo/frontPage";
import HeaderContent from "./HeaderContent";

export default async function Header() {
  const frontPage = await getFrontPage("FrontPage");
  return (
    <HeaderContent frontPage={frontPage} />
  );
}
