"use server";
import { getFrontPage } from "@/repo/frontPage";
import HeaderContent from "./HeaderContent";
import { getAllFeaturedProjects } from "@/repo/projects";

export default async function Header() {
  const frontPage = await getFrontPage("FrontPage");
  const featuredProjects = await getAllFeaturedProjects();
  return (
    <HeaderContent frontPage={frontPage} featuredProjects={featuredProjects}/>
  );
}
