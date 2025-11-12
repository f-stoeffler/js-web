"use client";
import { createProject } from "@/lib/projects";
import { useState } from "react";

export default function CreateProjectComp({
  className,
}: Readonly<{ className: string }>) {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectShortDesc, setProjectShortDesc] = useState("");
  const [error, setError] = useState("");

  const handleCreateProject = async () => {
    try {
      const createdProject = await createProject({
        title: projectTitle,
        shortDesc: projectShortDesc,
        slug: slugify(projectTitle),
      });
      if (!createdProject.success) {
        setError("Fehler beim erstellen des Projekts. Entweder existiert dieser Titel/Slug bereits oder dies ist ein Server-interner Fehler.")
        throw new Error("failed creating Project");
      }
      window.location.reload();
    } catch (error) {
      console.error("Fehler beim ändern des Projektes:", error);
    }
  };

  function slugify(str: string) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str
      .replace(/ä/g, "a")
      .replace(/ö/g, "o")
      .replace(/ü/g, "u")
      .replace(/ß/g, "ss");
    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
      .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-"); // remove consecutive hyphens
    return str;
  }

  return (
    <form
      className={`px-6 pb-6 pt-4 striped-background border-4 border-bg2 rounded-lg flex flex-col ${className}`}
      action={handleCreateProject}
    >
      <h2 className="text-xl mb-4 font-bold">Projekt erstellen</h2>
      <div className="grid w-full">
        <div className="grid">
          <label htmlFor="slug-create">Slug</label>
          <input
            type="text"
            name="slug-create"
            id="slug-create"
            className="bg-bg2 rounded border-2 border-bg mt-1 mb-4 px-1.5 py-0.5 text-stone-500"
            value={slugify(projectTitle)}
            readOnly
            required
            disabled={true}
          />
        </div>
        <div className="grid">
          <label htmlFor="title-create">Titel</label>
          <input
            type="text"
            name="title-create"
            id="title-create"
            className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5"
            value={projectTitle}
            required
            onChange={(e) => {
              setProjectTitle(e.target.value);
            }}
          />
        </div>
        <div className="grid">
          <label htmlFor="shortDesc-create">Kurzbeschreibung</label>
          <input
            type="text"
            name="shortDesc-create"
            id="shortDesc-create"
            className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5"
            value={projectShortDesc}
            required
            onChange={(e) => {
              setProjectShortDesc(e.target.value);
            }}
          />
        </div>
      </div>
      {error && <div className="text-red-400">{error}</div>}
      <div className="flex flex-col grow justify-end">
        <input
          type="submit"
          value={"Projekt erstellen"}
          className="bg-prim px-4 py-3 rounded hover:bg-primd cursor-pointer w-full"
        />
      </div>
    </form>
  );
}
