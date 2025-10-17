"use client";
import { updateProjectsPagePart } from "@/lib/projects";
import { Achievements } from "@prisma/client";
import { useState } from "react";

export default function EditProjectsSection({
  data,
  className,
}: Readonly<{ data: Achievements; className: string }>) {
  const [title, setTitle] = useState(data.title);
  const [desc, setDesc] = useState(data.desc);

  const handleUpdateProjectsSection = async () => {
    try {
    await updateProjectsPagePart({
      title: title,
      desc: desc,
    });
      window.location.reload();
    } catch (error) {
      console.error("Fehler beim ändern des Projektes:", error);
    }
  };

  return (
    <form
      className={`px-6 pb-6 pt-4 striped-background border-4 border-bg2 rounded-lg flex flex-col ${className}`}
      action={handleUpdateProjectsSection}
    >
      <h2 className="text-xl mb-4 font-bold">Projekte Sektion aktualisieren</h2>
      <div className=" grid gap-x-3">
        <div className="grid">
          <label htmlFor="title-proj">Titel</label>
          <input
            type="text"
            name="title-proj"
            id="title-proj"
            className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="w-full grid">
          <label htmlFor="desc-proj">Untertitel</label>
          <textarea
            name="desc-proj"
            id="desc-proj"
            className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5  min-h-30"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col grow justify-end">
        <input
          type="submit"
          value={"Projekte Sektion aktualisieren"}
          className="bg-prim px-4 py-3 rounded hover:bg-primd cursor-pointer w-full"
        />
      </div>
    </form>
  );
}
