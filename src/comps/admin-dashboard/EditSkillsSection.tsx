"use client";
import { SkillItem, Skills } from "@prisma/client";
import { useState } from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import {
  createSkillItem,
  deleteSkillItem,
  updateSkillItem,
} from "@/lib/skills";

export default function EditSkillsSection({
  data,
  className,
}: Readonly<{
  data:
    | ({
        skillItems: SkillItem[];
      } & Skills)
    | null;
  className: string;
}>) {
  const [skillItems, setSkillItems] = useState<SkillItem[] | undefined>(
    data?.skillItems
  );

  const handleUpdateProjectsSection = async (e: FormData, id: number) => {
    try {
      const title = e.get(`title-skill-${id}`) as string;
      const desc = e.get(`desc-skill-${id}`) as string;
      await updateSkillItem(id, { title: title, desc: desc });
      window.location.reload();
    } catch (error) {
      console.error("Fehler beim ändern des Projektes:", error);
    }
  };

  const handleAddSkill = async () => {
    try {
      await createSkillItem({ title: "", desc: "" });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSkill = async (id: number) => {
    try {
      await deleteSkillItem(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (skillItems) return (
    <div
      className={`px-6 pb-6 pt-4 striped-background border-4 border-bg2 rounded-lg ${className}`}
    >
      <h2 className="text-xl mb-4 font-bold">Informationskarten-Sektion aktualisieren ({skillItems.length}/5)</h2>
      <div className="flex gap-4 flex-nowrap overflow-x-auto pb-3">
        {skillItems?.map((item) => (
          <form
            key={item.id}
            action={(e) => handleUpdateProjectsSection(e, item.id)}
            className="bg-bg2 px-3 py-2 rounded-lg border-4 border-bg"
          >
            <div className="grid min-w-xs">
              <label htmlFor={`title-skill-${item.id}`}>Titel</label>
              <input
                type="text"
                name={`title-skill-${item.id}`}
                id={`title-skill-${item.id}`}
                className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5"
                defaultValue={item.title}
              />
            </div>
            <div className="w-full grid">
              <label htmlFor={`desc-skill-${item.id}`}>Untertitel</label>
              <textarea
                name={`desc-skill-${item.id}`}
                id={`desc-skill-${item.id}`}
                className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5  min-h-30"
                defaultValue={item.desc}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="submit"
                  value={"Speichern"}
                  className="bg-prim px-4 py-3 rounded hover:bg-primd cursor-pointer"
                />
                <button
                  className="bg-red-500/80 px-4 py-3 rounded hover:bg-red-700 cursor-pointer"
                  onClick={() => handleDeleteSkill(item.id)}
                >
                  Karte löschen
                </button>
              </div>
            </div>
          </form>
        ))}
        <div className="grow flex items-center">
          <button
            className="bg-prim rounded px-2 py-1.5 cursor-pointer hover:bg-primd transition-all disabled:bg-prim/20 disabled:text-fg/20 disabled:cursor-default"
            onClick={handleAddSkill}
            disabled={skillItems.length >= 5}
          >
            Karte hinzufügen
          </button>
        </div>
      </div>
      <div className="flex flex-col grow justify-end"></div>
    </div>
  );
}
