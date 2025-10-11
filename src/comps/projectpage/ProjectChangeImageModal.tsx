"use client";

import { useState, useRef } from "react";
import { updateProject } from "@/lib/projects";
import { Prisma, ProjectImage } from "@prisma/client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
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
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  const handleSave = async () => {
    if (!isAdmin) return;
    setIsSaving(true);
    setSaveError(null);

    try {
      const result = await updateProject(slug, {
        // Add any other fields you want to update
      });

      if (result.success) {
        setChangeImageModalOpen(false);
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
    setSaveError(null);
    setChangeImageModalOpen(false);
    setSelectedImageId(null);
  };

  const handleChangeMainImageClick = () => {
    setSelectedImageId(null); // Clear any selected image ID
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleOtherImageClick = (imageId: number) => {
    setSelectedImageId(imageId);
    console.log("Clicked image ID:", imageId);
    // For now, just log the ID. You can add file selection logic here later
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0 && isAdmin) {
      const selectedFile = files[0];

      setUploading(true);
      setSaveError(null);

      try {
        // Create FormData for file upload
const projectUpdateObject: Prisma.ProjectUpdateInput = {
  images: {
    update: [
      {
        where: { 
          parentSlug_id: { 
            parentSlug: "asd", 
            id: 1 
          } 
        },
        data: {
          // The fields you want to update
          imgPath: "new-image-url.jpg",
          // ... other ProjectImage fields
        }
      }
    ],
  },
};
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("slug", slug);

        // Check if we're updating main image or another image
        if (selectedImageId === null) {
          // Main image
          formData.append("isMainImage", "true");
        } else {
          // Other image - pass the image ID
          formData.append("isMainImage", "false");
          formData.append("imageId", selectedImageId.toString());
        }

        // Upload the file
        const uploadResponse = await fetch("/api/auth/project/upload", {
          method: "POST",
          body: formData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadResult.error || "Upload failed");
        }

        if (selectedImageId === null) {
          // Update the project with the new main image path
          const updateResult = await updateProject(slug, {
            mainImage: uploadResult.filePath,
          });

          if (updateResult.success) {
            console.log(
              "Main image updated successfully:",
              uploadResult.filePath
            );
          } else {
            throw new Error(updateResult.error || "Failed to update project");
          }
        } else {
          // Handle updating other images here
          console.log(
            "Other image update - ID:",
            selectedImageId,
            "Path:",
            uploadResult.filePath
          );
          // You'll need to implement your API for updating other images
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setSaveError(error instanceof Error ? error.message : "Upload failed");
      } finally {
        setUploading(false);
        setSelectedImageId(null);
        // Reset the input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  if (changeImageModalOpen) {
    return (
      <div className="space-y-4 fixed inset-0 w-full h-screen bg-black/60 z-20 flex items-center justify-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />

        <div className="w-5/6">
          <div className="striped-background px-7 py-6 rounded-lg">
            <div className="text-white text-lg mb-4">
              Bilder bearbeiten - {slug}
            </div>

            {/* Upload status */}
            {uploading && (
              <div className="text-yellow-400 mb-4">
                Bild wird hochgeladen...
              </div>
            )}
            {saveError && (
              <div className="text-red-400 mb-4">Fehler: {saveError}</div>
            )}

            <Swiper
              slidesPerView={"auto"}
              spaceBetween={30}
              scrollbar={{ hide: true }}
              modules={[Scrollbar, FreeMode]}
              className="image-modal-swiper"
              freeMode={true}
            >
              <SwiperSlide className="relative">
                <Image
                  src={`/projects/${mainImg}`}
                  height={200}
                  width={300}
                  alt="Main project image"
                  className="rounded-lg border-4 border-priml hover:border-primd"
                />
                <button
                  onClick={handleChangeMainImageClick}
                  disabled={uploading}
                  className="absolute bottom-4 left-4 bg-priml px-3 py-1.5 rounded hover:bg-primd hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "Upload..." : "Hauptbild Ändern"}
                </button>
              </SwiperSlide>

              {imgs?.map((img) => (
                <SwiperSlide
                  key={img.id}
                  className="relative cursor-pointer"
                  onClick={() => handleOtherImageClick(img.id)}
                >
                  <Image
                    src={`/projects/${img.imgPath}`}
                    height={200}
                    width={300}
                    alt="Project image"
                    className="rounded-lg hover:border-4 hover:border-priml transition-all"
                  />
                  <div className="absolute bottom-4 left-4 bg-priml px-3 py-1.5 rounded opacity-0 hover:opacity-100 transition-opacity">
                    Bild ändern
                  </div>
                  {/* Show selected state */}
                  {selectedImageId === img.id && (
                    <div className="absolute inset-0 border-4 border-primd rounded-lg"></div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Show selected image info */}
            {selectedImageId !== null && (
              <div className="text-white mt-4">
                Ausgewähltes Bild ID: {selectedImageId}
                <button
                  onClick={() => {
                    setSelectedImageId(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                  className="ml-4 px-3 py-1 bg-priml rounded hover:bg-primd"
                >
                  Datei auswählen
                </button>
              </div>
            )}

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                disabled={isSaving || uploading}
                className="px-4 py-2 bg-prim text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primd hover:cursor-pointer transition-all"
              >
                {isSaving ? "Speichern..." : "Speichern"}
              </button>
              <button
                onClick={handleCancel}
                disabled={isSaving || uploading}
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
    <button
      className="px-3 py-2 mt-2 text-lg bg-prim rounded hover:cursor-pointer hover:bg-primd transition-all"
      onClick={() => setChangeImageModalOpen(true)}
    >
      Bilder ändern
    </button>
  );
}
