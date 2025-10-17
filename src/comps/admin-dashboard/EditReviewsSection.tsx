"use client";
import { updateFrontPage } from "@/lib/frontPage";
import { createProject } from "@/lib/projects";
import { updateReviewsSection } from "@/lib/reviews";
import { Achievements, FrontPage } from "@prisma/client";
import { useState } from "react";

export default function EditReviewsSection({
  data,
  className,
}: Readonly<{ data: Achievements; className: string }>) {
  const [title, setTitle] = useState(data.title);
  const [desc, setDesc] = useState(data.desc);

  const handleUpdateReviewsSection = async () => {
    try {
    await updateReviewsSection({
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
      action={handleUpdateReviewsSection}
    >
      <h2 className="text-xl mb-4 font-bold">Reviews Sektion aktualisieren</h2>
      <div className=" grid gap-x-3">
        <div className="grid">
          <label htmlFor="title-rev">Titel</label>
          <input
            type="text"
            name="title-rev"
            id="title-rev"
            className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="w-full grid">
          <label htmlFor="desc-rev">Untertitel</label>
          <textarea
            name="desc-rev"
            id="desc-rev"
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
          value={"Reviews Sektion aktualisieren"}
          className="bg-prim px-4 py-3 rounded hover:bg-primd cursor-pointer w-full"
        />
      </div>
    </form>
  );
}
