"use client";
import { FooterItem } from "@prisma/client";
import { useState } from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import {
  createFooterItem,
  deleteFooterItem,
  getFooter,
  updateFooterItem,
} from "@/lib/footer";

export default function EditFooterItems({
  data,
  className,
}: Readonly<{
  data: FooterItem[] | undefined;
  className: string;
}>) {
  const [footerItems, setFooterItems] = useState<FooterItem[] | undefined>(
    data
  );

  const handleUpdateFooterItem = async (e: FormData, id: number) => {
    try {
      const text = e.get(`footer-info-text-${id}`) as string;
      const url = e.get(`footer-info-link-${id}`) as string;
      await updateFooterItem(id, { text: text, url: url });
      const newFooter = await getFooter();
      setFooterItems(newFooter?.footerItems);
    } catch (error) {
      console.error("Fehler beim ändern des Projektes:", error);
    }
  };

  const handleAddFooterItem = async () => {
    try {
      await createFooterItem({ text: "Neue Info", url: "" });
      const newFooter = await getFooter();
      setFooterItems(newFooter?.footerItems);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFooterItem = async (id: number) => {
    try {
      await deleteFooterItem(id);
      const newFooter = await getFooter();
      setFooterItems(newFooter?.footerItems);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`px-6 pb-6 pt-4 striped-background border-4 border-bg2 rounded-lg ${className}`}
    >
      <h2 className="text-xl mb-4 font-bold">
        Footer Links/Infos aktualisieren ({footerItems?.length})
      </h2>
      <div className="flex gap-4 flex-nowrap overflow-x-auto pb-3">
        {footerItems?.map((item) => (
          <form
            key={item.id}
            action={(e) => handleUpdateFooterItem(e, item.id)}
            className="bg-bg2 px-3 py-2 rounded-lg border-4 border-bg"
          >
            <div className="grid min-w-xs">
              <label htmlFor={`footer-info-text-${item.id}`}>Text</label>
              <input
                required
                type="text"
                name={`footer-info-text-${item.id}`}
                id={`footer-info-text-${item.id}`}
                className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5"
                defaultValue={item.text}
              />
            </div>
            <div className="w-full grid">
              <label htmlFor={`footer-info-link-${item.id}`}>Link</label>
              <textarea
                name={`footer-info-link-${item.id}`}
                id={`footer-info-link-${item.id}`}
                className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5  min-h-30"
                defaultValue={item.url}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="submit"
                  value={"Speichern"}
                  className="bg-prim px-4 py-3 rounded hover:bg-primd cursor-pointer"
                />
                <button
                  type="button"
                  className="bg-red-500/80 px-1 py-3 rounded hover:bg-red-700 cursor-pointer"
                  onClick={() => handleDeleteFooterItem(item.id)}
                >
                  Vom Footer löschen
                </button>
              </div>
            </div>
          </form>
        ))}
        <div className="grow flex items-center">
          <button
            className="bg-prim rounded px-2 py-1.5 cursor-pointer hover:bg-primd transition-all disabled:bg-prim/20 disabled:text-fg/20 disabled:cursor-default"
            onClick={handleAddFooterItem}
          >
            Link/Info hinzufügen
          </button>
        </div>
      </div>
      <div className="flex flex-col grow justify-end"></div>
    </div>
  );
}
