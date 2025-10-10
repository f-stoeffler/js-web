"use client";

import { useState, useRef } from "react";
import Markdown from "react-markdown";
import { updateProject } from "@/lib/projects";
import ProjectTitle from "./ProjectTitle";
import { ProjectImage } from "@prisma/client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/scrollbar';

// import required modules
import { FreeMode, Scrollbar } from "swiper/modules";

export default function ProjectChangeImageModal({
  isAdmin,
  slug,
  imgs,
  mainImg,
}: {
  isAdmin: boolean;
  slug: string;
  imgs: Array<ProjectImage> | undefined;
  mainImg: string | undefined;
}) {
  const [changeImageModalOpen, setChangeImageModalOpen] = useState(false);
  const [newDesc, setNewDesc] = useState("initialDesc");
  const [newTitle, setNewTitle] = useState("initialTitle");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    if (!isAdmin) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const result = await updateProject(slug, {
        desc: newDesc,
      });

      if (result.success) {
        setChangeImageModalOpen(false);
        // Optional: show success message
      } else {
        setSaveError(result.error || "Failed to save");
      }
    } catch (error) {
      setSaveError("An error occurred while saving");
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setNewDesc(newDesc);
    setNewTitle(newTitle);
    setSaveError(null);
    setChangeImageModalOpen(false);
  };

  // Function to trigger file input click
  const handleChangeMainImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function to handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      
      // Log file information to console
      console.log("Selected file:", {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        path: URL.createObjectURL(selectedFile), // This creates a blob URL
        lastModified: new Date(selectedFile.lastModified).toLocaleString(),
      });

      // Here you would typically:
      // 1. Upload the file to your server/API
      // 2. Update the project with the new image path
      // 3. Handle the response and update the UI

      // Reset the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (changeImageModalOpen) {
    return (
      <div className="space-y-4 fixed inset-0 w-full h-screen bg-black/60 z-20 flex items-center justify-center">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />
        
        <div className="w-5/6">
          <div className="striped-background px-7 py-6 rounded-lg">
            <div className="">Test</div>
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={30}
              scrollbar={{
                hide: true,
              }}
              modules={[Scrollbar, FreeMode]}
              className="image-modal-swiper"
              freeMode={true}
            >
              <SwiperSlide className="">
                <Image
                  src={`/projects/${mainImg}`}
                  height={100}
                  width={100}
                  alt="test"
                  className="rounded-lg border-4 border-priml hover:border-primd"
                />
                <button 
                  onClick={handleChangeMainImageClick}
                  className="absolute bottom-4 left-4 bg-priml px-3 py-1.5 rounded hover:bg-primd hover:cursor-pointer"
                >
                  Hauptbild Ändern
                </button>
              </SwiperSlide>
              {imgs?.map((img) => (
                <SwiperSlide key={img.id} className="">
                  <Image
                    src={`/projects/${img.imgPath}`}
                    height={100}
                    width={100}
                    alt="test"
                    className="rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-prim text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primd hover:cursor-pointer transition-all"
              >
                {isSaving ? "Speichern..." : "Speichern"}
              </button>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="px-4 py-2 border rounded disabled:opacity-50 border-red-500 text-red-500 hover:cursor-pointer hover:bg-red-500 hover:text-white transition-all"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        className="px-3 py-2 mt-2 text-lg bg-prim rounded hover:cursor-pointer hover:bg-primd transition-all"
        onClick={() => setChangeImageModalOpen(true)}
      >
        Bilder ändern
      </button>
    </>
  );
}