"use client";
import { NavbarItem } from "@prisma/client";
import { useState } from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import { createNavbarItem, deleteNavbarItem, getHeader, updateNavbarItem } from "@/lib/header";

export default function EditNavbarItems({
  data,
  className,
}: Readonly<{
  data: NavbarItem[] | undefined;
  className: string;
}>) {
  const [navbarItems, setNavbarItems] = useState<NavbarItem[] | undefined>(data);

  const handleUpdateNavbarItem = async (e: FormData, id: number) => {
    try {
      const title = e.get(`navbar-item-title-${id}`) as string;
      const url = e.get(`navbar-item-link-${id}`) as string;
      await updateNavbarItem(id, { title: title, url: url });
      const newHeader = await getHeader()
      setNavbarItems(newHeader?.navbarItems);
    } catch (error) {
      console.error("Fehler beim ändern des Projektes:", error);
    }
  };

  const handleAddNavbarItem = async () => {
    try {
      await createNavbarItem({ title: "Neuer Link", url: "/" });
      const newHeader = await getHeader()
      setNavbarItems(newHeader?.navbarItems);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNavbarItem = async (id: number) => {
    try {
      await deleteNavbarItem(id);
      const newHeader = await getHeader()
      setNavbarItems(newHeader?.navbarItems);
    } catch (error) {
      console.error(error);
    }
  };

    return (
      <div
        className={`px-6 pb-6 pt-4 striped-background border-4 border-bg2 rounded-lg ${className}`}
      >
        <h2 className="text-xl mb-4 font-bold">
          Navigationsleistenlinks aktualisieren ({navbarItems?.length})
        </h2>
        <div className="flex gap-4 flex-nowrap overflow-x-auto pb-3">
          {navbarItems?.map((item) => (
            <form
              key={item.id}
              action={(e) => handleUpdateNavbarItem(e, item.id)}
              className="bg-bg2 px-3 py-2 rounded-lg border-4 border-bg"
            >
              <div className="grid min-w-xs">
                <label htmlFor={`navbar-item-title-${item.id}`}>Text</label>
                <input
                  required
                  type="text"
                  name={`navbar-item-title-${item.id}`}
                  id={`navbar-item-title-${item.id}`}
                  className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5"
                  defaultValue={item.title}
                />
              </div>
              <div className="w-full grid">
                <label htmlFor={`navbar-item-link-${item.id}`}>Link</label>
                <textarea
                  required
                  name={`navbar-item-link-${item.id}`}
                  id={`navbar-item-link-${item.id}`}
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
                    onClick={() => handleDeleteNavbarItem(item.id)}
                  >
                    Link löschen
                  </button>
                </div>
              </div>
            </form>
          ))}
          <div className="grow flex items-center">
            <button
              className="bg-prim rounded px-2 py-1.5 cursor-pointer hover:bg-primd transition-all disabled:bg-prim/20 disabled:text-fg/20 disabled:cursor-default"
              onClick={handleAddNavbarItem}
            >
              Link/Info hinzufügen
            </button>
          </div>
        </div>
        <div className="flex flex-col grow justify-end"></div>
      </div>
    );
}
