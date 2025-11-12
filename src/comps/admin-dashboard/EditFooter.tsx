"use client";
import { updateFooter } from "@/lib/footer";
import { Footer } from "@prisma/client";
import { useState } from "react";

export default function EditFooter({
  data,
  className,
}: Readonly<{ data: Footer; className: string }>) {
  const [title, setTitle] = useState(data.title);
  const [botText, setBotText] = useState(data.bottomText);

  const handleUpdateFooter = async () => {
    try {
      await updateFooter({
        title: title,
        bottomText: botText,
      });
      window.location.reload();
    } catch (error) {
      console.error("Fehler beim ändern des Projektes:", error);
    }
  };

  return (
    <form
      className={`px-6 pb-6 pt-4 striped-background border-4 border-bg2 rounded-lg flex flex-col ${className}`}
      action={handleUpdateFooter}
    >
      <h2 className="text-xl mb-4 font-bold">Footer aktualisieren</h2>
      <div className=" grid gap-x-3">
        <div className="grid">
          <label htmlFor="footer-top-text">Titel</label>
          <input
            required
            type="text"
            name="footer-top-text"
            id="footer-top-text"
            className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="w-full grid">
          <label htmlFor="footer-bot-text">Untertitel</label>
          <textarea
            name="footer-bot-text"
            id="footer-bot-text"
            className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5  min-h-30"
            value={botText}
            onChange={(e) => {
              setBotText(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col grow justify-end">
        <input
          type="submit"
          value={"Footer aktualisieren"}
          className="bg-prim px-4 py-3 rounded hover:bg-primd cursor-pointer w-full"
        />
      </div>
    </form>
  );
}
