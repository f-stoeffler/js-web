"use client";
import { updateFrontPage } from "@/lib/frontPage";
import { FrontPage } from "@prisma/client";
import { useState } from "react";

export default function EditFrontPage({
  data,
  className,
}: Readonly<{ data: FrontPage; className: string }>) {
  const [title, setTitle] = useState(data.title);
  const [desc, setDesc] = useState(data.desc);
  const [btnText, setBtnText] = useState(data.btnText);
  const [btnHref, setBtnHref] = useState(data.btnHref);

  const handleUpdateFrontPage = async () => {
    try {
    await updateFrontPage({
      title: title,
      desc: desc,
      btnText: btnText,
      btnHref: btnHref,
    });
      window.location.reload();
    } catch (error) {
      console.error("Fehler beim ändern des Projektes:", error);
    }
  };

  return (
    <form
      className={`px-6 pb-6 pt-4 striped-background border-4 border-bg2 rounded-lg flex flex-col ${className}`}
      action={handleUpdateFrontPage}
    >
      <h2 className="text-xl mb-4 font-bold">Frontpage aktualisieren</h2>
      <div className=" grid grid-cols-2 gap-x-3">
        <div className="grid">
          <label htmlFor="title-fp">Titel</label>
          <input
            type="text"
            name="title-fp"
            id="title-fp"
            className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5"
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="grid">
          <label htmlFor="btn-text-fp">Knopf Text</label>
          <input
            type="text"
            name="btn-text-fp"
            id="btn-text-fp"
            className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5"
            value={btnText}
            required
            onChange={(e) => {
              setBtnText(e.target.value);
            }}
          />
        </div>
        <div className="w-full grid">
          <label htmlFor="desc-fp">Untertitel</label>
          <textarea
            name="desc-fp"
            id="desc-fp"
            className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5  min-h-30"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <div className="w-full grid">
          <label htmlFor="btn-href-fp">Knopf Link</label>
          <textarea
            name="btn-href-fp"
            id="btn-href-fp"
            className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5 min-h-30"
            value={btnHref}
            required
            onChange={(e) => {
              setBtnHref(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col grow justify-end">
        <input
          type="submit"
          value={"Frontpage aktualisieren"}
          className="bg-prim px-4 py-3 rounded hover:bg-primd cursor-pointer w-full"
        />
      </div>
    </form>
  );
}
