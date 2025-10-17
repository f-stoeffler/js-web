"use client";

import { useState, useRef, useEffect } from "react";
import { getAllProjectImages, updateProject } from "@/lib/projects";
import { Prisma, ProjectImage } from "@prisma/client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { FreeMode, Scrollbar } from "swiper/modules";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ProjectChangeImageModal({
  isAdmin,
  slug,
  imgs,
  mainImg,
  mainImgVer,
  title,
}: {
  isAdmin: boolean;
  slug: string;
  imgs: Array<ProjectImage>;
  mainImg: string;
  mainImgVer: Date;
  title: string;
}) {
  const projectUpdateObject: Prisma.ProjectUpdateInput = {
    images: {
      update: [
        {
          where: {
            parentSlug_id: {
              parentSlug: slug,
              id: 1,
            },
          },
          data: {
            imgPath: "new-image-url.jpg",
          },
        },
        {
          where: {
            parentSlug_id: {
              parentSlug: slug,
              id: 2,
            },
          },
          data: {
            imgPath: "new-image-url.jpg",
          },
        },
      ],
      create: [
        {
          id: 2,
          imgPath: "new-image-url.jpg",
        },
      ],
      delete: [
        {
          parentSlug_id: {
            parentSlug: slug,
            id: 1,
          },
        },
      ],
    },
  };

  const updateTemplate: (
    imgIdVal: number,
    imgPathVal: string
  ) => Prisma.ProjectImageUpdateWithWhereUniqueWithoutParentRelationInput = (
    imgIdVal,
    imgPathVal
  ) => {
    return {
      where: {
        parentSlug_id: {
          parentSlug: slug,
          id: imgIdVal,
        },
      },
      data: {
        imgPath: imgPathVal,
      },
    };
  };
  const createTemplate: (
    imgIdVal: number,
    imgPathVal: string
  ) => Prisma.ProjectImageCreateWithoutParentRelationInput = (
    imgIdVal,
    imgPathVal
  ) => {
    return {
      id: imgIdVal,
      imgPath: imgPathVal,
    };
  };
  const deleteTemplate: (
    imgIdVal: number
  ) => Prisma.ProjectImageWhereUniqueInput = (imgIdVal) => {
    return {
      parentSlug_id: {
        parentSlug: slug,
        id: imgIdVal,
      },
    };
  };
  const getHighestId = () => {
    const imgIds = imgsState.map((img) => img.id);
    let determinedHighestId;
    if (imgIds.length !== 0) {
      determinedHighestId = Math.max(...imgIds);
    } else {
      determinedHighestId = -1;
    }
    console.log("Höchste ID: " + determinedHighestId);
    return determinedHighestId;
  };

  const [changeImageModalOpen, setChangeImageModalOpen] = useState(false);
  const [imgsState, setImgsState] = useState(imgs);
  const [mainImgState, setMainImgState] = useState(
    `${mainImg}?v=${mainImgVer}`
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const otherFileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Map<number, File>>(
    new Map()
  );
  const [mode, setMode] = useState("create"); // or your default value
  const [initWarning, setInitWarning] = useState(0); // 0 = Warning will be displayed on hover, 1 = Warning is being displayed, 2 = Warning has been dismissed and won't be displayed for the rest of the session
  const [createImgId, setCreateImgId] = useState(getHighestId() + 1); // the highest ID+1 to ensure no duplicate IDs
  const [cancelOnChange, setCancelOnChange] = useState(false); // or your default value
  const [projectImagesUpdate, setProjectImagesUpdate] = useState<
    Map<
      number,
      Prisma.ProjectImageUpdateWithWhereUniqueWithoutParentRelationInput
    >
  >(new Map());
  const [projectImagesCreate, setProjectImagesCreate] = useState<
    Map<number, Prisma.ProjectImageCreateWithoutParentRelationInput>
  >(new Map());
  const [projectImagesDelete, setProjectImagesDelete] = useState<
    Map<number, Prisma.ProjectImageWhereUniqueInput>
  >(new Map());

  // get the new highest ID when the images change
  useEffect(() => {
    setCreateImgId(getHighestId() + 1);
  }, [imgsState]);

  // reset everything
  useEffect(() => {
    setProjectImagesDelete(new Map());
    setProjectImagesCreate(new Map());
    setProjectImagesUpdate(new Map());
    setCreateImgId(getHighestId() + 1);
    setSelectedFiles(new Map());
    setSelectedImageId(null);
  }, [mode, cancelOnChange, imgsState]);

  const handleWarningHover = () => {
    if (initWarning === 0) {
      setInitWarning(1);
    }
  };

  const handleWarningClick = () => {
    setInitWarning(2);
  };

  const handleCancel = () => {
    setCancelOnChange(!cancelOnChange);
  };
  const handleClose = () => {
    setSaveError(null);
    setChangeImageModalOpen(false);
    setSelectedImageId(null);
  };

  const handleChangeMainImageClick = () => {
    setSelectedImageId(null);
    if (mainFileInputRef.current) {
      mainFileInputRef.current.click();
    }
  };

  const handleOtherImageClick = (imageId: number) => {
    setSelectedImageId(imageId);
    // in update-mode open file browser if this image is not already selected, in create-mode just open the file browser
    if (
      (projectImagesUpdate.get(imageId) == undefined && mode === "update") ||
      mode === "create"
    ) {
      if (otherFileInputRef.current) {
        otherFileInputRef.current.click();
      }
      // in update-mode if image is selected, remove it from the selection
    } else if (mode === "update") {
      projectImagesUpdate.delete(imageId);
      setProjectImagesUpdate(new Map(projectImagesUpdate));
      // in delete-mode, if image is not already selected, add it to the selection
    } else if (mode === "delete") {
      if (projectImagesDelete.get(imageId) == undefined) {
        projectImagesDelete.set(imageId, deleteTemplate(imageId));
        setProjectImagesDelete(new Map(projectImagesDelete));
        // if image is selected, remove it from selection
      } else {
        projectImagesDelete.delete(imageId);
        setProjectImagesDelete(new Map(projectImagesDelete));
      }
    }
  };

  const handleOtherFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    // if there is an image was clicked on, or you are in create-mode, get the extension of the file.
    if (
      files &&
      files.length > 0 &&
      isAdmin &&
      (selectedImageId !== null || mode === "create")
    ) {
      const fileExtension = files[0].type.replace(/(.*)\//g, "");

      // if in update mode, add image to selected images
      if (mode === "update" && selectedImageId !== null) {
        const dbPath = `${slug}/${selectedImageId}.${fileExtension}`;
        const selectedFilesTemp = new Map(selectedFiles);
        setSelectedFiles(selectedFilesTemp.set(selectedImageId, files[0]));
        const projectUpdatesTemp = new Map(projectImagesUpdate);
        setProjectImagesUpdate(
          projectUpdatesTemp.set(
            selectedImageId,
            updateTemplate(selectedImageId, dbPath)
          )
        );
      } else if (mode === "create") {
        const dbPath = `${slug}/${createImgId}.${fileExtension}`;
        const selectedFilesTemp = new Map(selectedFiles);
        setSelectedFiles(selectedFilesTemp.set(createImgId, files[0]));
        const projectCreateTemp = new Map(projectImagesCreate);
        setProjectImagesCreate(
          projectCreateTemp.set(
            createImgId,
            createTemplate(createImgId, dbPath)
          )
        );
        setCreateImgId(createImgId + 1);
      }
    }
  };

  const handleOtherFileSave = async () => {
    if (selectedFiles && isAdmin) {
      console.log(selectedFiles.entries);
      try {
        const imageIDs: Array<number> = [];
        const formData = new FormData();
        formData.append("slug", slug);
        formData.append("mode", mode);

        let dbUpdate: Prisma.ProjectUpdateInput = {};

        if (mode == "update") {
          selectedFiles.forEach(function (value, key) {
            formData.append(String(key), value);
            imageIDs.push(key);
          });
          formData.append("imageIDs", JSON.stringify(imageIDs));
          const projectUpdatesArray: Prisma.ProjectImageUpdateWithWhereUniqueWithoutParentRelationInput[] =
            [];
          projectImagesUpdate.forEach(function (value, key) {
            projectUpdatesArray.push(value);
          });

          dbUpdate = {
            images: {
              update: projectUpdatesArray,
            },
          };
        } else if (mode == "create") {
          let highestId = getHighestId() + 1;
          selectedFiles.forEach(function (value, key) {
            formData.append(String(highestId), value);
            imageIDs.push(highestId);
            highestId++;
          });
          formData.append("imageIDs", JSON.stringify(imageIDs));
          const projectCreateArray: Prisma.ProjectImageCreateWithoutParentRelationInput[] =
            [];
          projectImagesCreate.forEach(function (value, key) {
            projectCreateArray.push(value);
          });

          dbUpdate = {
            images: {
              create: projectCreateArray,
            },
          };
        } else if (mode == "delete") {
          projectImagesDelete.forEach(function (value, key) {
            imageIDs.push(key);
          });
          formData.append("imageIDs", JSON.stringify(imageIDs));
          const projectDeleteArray: Prisma.ProjectImageWhereUniqueInput[] = [];
          projectImagesDelete.forEach(function (value, key) {
            projectDeleteArray.push(value);
          });

          dbUpdate = {
            images: {
              delete: projectDeleteArray,
            },
          };
        }

        console.log(JSON.stringify(dbUpdate));
        formData.append("dbUpdate", JSON.stringify(dbUpdate));

        // Upload the file
        const uploadResponse = await fetch(
          "/api/auth/project/secondary-images/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadResult.error || "Upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setSaveError(error instanceof Error ? error.message : "Upload failed");
      } finally {
        setImgsState(await getAllProjectImages(slug));
      }
    }
  };

  const handleMainFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0 && isAdmin) {
      const selectedFile = files[0];

      setUploading(true);
      setSaveError(null);

      try {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("slug", slug);

        formData.append("isMainImage", "true");

        // Upload the file
        const uploadResponse = await fetch(
          "/api/auth/project/main-image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadResult.error || "Upload failed");
        }

        setMainImgState(`${uploadResult.mainImage}?v=${uploadResult.mainImageVer}`);
        console.log(uploadResult.mainImageVer);
      } catch (error) {
        console.error("Error uploading file:", error);
        setSaveError(error instanceof Error ? error.message : "Upload failed");
      } finally {
        setUploading(false);
        setSelectedImageId(null);
        // Reset the input
        if (mainFileInputRef.current) {
          mainFileInputRef.current.value = "";
        }
      }
    }
  };

  if (changeImageModalOpen) {
    return (
      <div className="space-y-4 fixed inset-0 w-full h-screen bg-black/60 z-20 flex items-center justify-center">
        <input
          type="file"
          ref={mainFileInputRef}
          onChange={handleMainFileSelect}
          accept="image/*"
          className="hidden"
        />
        <input
          type="file"
          ref={otherFileInputRef}
          onChange={handleOtherFileSelect}
          accept="image/*"
          className="hidden"
        />

        <div className="w-5/6">
          <div className="striped-background px-7 py-6 rounded-lg">
            <div className="text-white text-2xl mb-4 grid grid-cols-2">
              <div className="flex items-center">
                Bilder bearbeiten - {title}
              </div>
              <div className="flex w-full justify-end">
                <button
                  className="bg-prim text-fg p-1.5 rounded-full hover:cursor-pointer hover:bg-red-500 transition-all"
                  onClick={handleClose}
                >
                  <i className="bi bi-x-lg text-2xl mx-1"></i>
                </button>
              </div>
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
                  src={`http://localhost:3000/api/project/${mainImgState}`}
                  height={800}
                  width={800}
                  alt="Main project image"
                  className="rounded-lg border-4 mr-10"
                />
                <button
                  onClick={handleChangeMainImageClick}
                  disabled={uploading}
                  className="absolute bottom-4 left-4 bg-priml px-3 py-1.5 rounded hover:bg-primd hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "Upload..." : "Hauptbild Ändern"}
                </button>
              </SwiperSlide>

              {imgsState?.map((img) => (
                <SwiperSlide
                  key={img.id}
                  className="relative "
                  onClick={() => {
                    if (mode === "update" || mode === "delete") {
                      handleOtherImageClick(img.id);
                    }
                  }}
                >
                  <Image
                    src={`${process.env.WEBSITE_URL}/api/project/${img?.imgPath}?v=${img.updatedAt}`}
                    height={800}
                    width={800}
                    alt="Project image"
                    className={`rounded-lg  border-priml ${
                      (mode === "update" || mode === "delete") &&
                      "hover:border-4 cursor-pointer"
                    } transition-all duration-75 ${
                      (projectImagesUpdate.get(img.id) != undefined ||
                        projectImagesDelete.get(img.id) != undefined) &&
                      "border-4"
                    } ${mode === "delete" ? "border-red-500" : "border-primd"}`}
                  />
                </SwiperSlide>
              ))}
              <SwiperSlide className="relative">
                <button
                  onClick={() => handleOtherImageClick(-1)}
                  disabled={mode !== "create"}
                  className={`rounded-lg border-4 border-priml hover:border-primd transition-all w-16 h-16 cursor-pointer text-priml disabled:border-gray-500 disabled:text-gray-500 disabled:cursor-default`}
                >
                  <div className="text-2xl">+</div>
                </button>
              </SwiperSlide>
            </Swiper>

            <div className="grid grid-cols-2 gap-2 mt-4 w-full">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleOtherFileSave}
                  disabled={isSaving || uploading || !(
                      projectImagesUpdate.size > 0 ||
                      projectImagesCreate.size > 0 ||
                      projectImagesDelete.size > 0
                    )}
                  className="px-4 py-2 bg-prim text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primd hover:cursor-pointer transition-all"
                >
                  {isSaving ? "Speichern..." : "Speichern"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving || uploading}
                  className={`px-4 py-2 border rounded disabled:opacity-50 border-red-500 text-red-500 hover:cursor-pointer hover:bg-red-500 hover:text-white transition-all ${
                    !(
                      projectImagesUpdate.size > 0 ||
                      projectImagesCreate.size > 0 ||
                      projectImagesDelete.size > 0
                    ) && "hidden"
                  }`}
                >
                  Abbrechen
                </button>
                {projectImagesCreate.size > 0 && (
                  <div className="">
                    {projectImagesCreate.size} Bilder zum hinzufügen ausgewählt.
                  </div>
                )}
              </div>
              <div className="flex w-full justify-end items-center space-x-2">
                <div
                  className="flex items-center space-x-2"
                  onMouseEnter={handleWarningHover}
                >
                  <div
                    onClick={handleWarningClick}
                    className={`absolute bg-red-800/80 hover:bg-red-600/90 rounded-lg border-2 border-red-500 w-sm items-center h-14 cursor-pointer transition-all ${
                      initWarning === 1 ? "flex" : "hidden"
                    }`}
                  >
                    <div className="px-2 text-center cursor-pointer">
                      Nicht gespeicherte Änderungen werden bei einem
                      Moduswechsel verworfen.
                    </div>
                  </div>
                  <div className="pl-1">Modus:</div>
                  <label
                    className={`flex items-center px-4 py-2 border rounded cursor-pointer transition-all border-prim ${
                      mode === "create"
                        ? "bg-prim text-white"
                        : "text-prim  hover:bg-prim hover:text-white"
                    } ${
                      isSaving || uploading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="action"
                      value="create"
                      checked={mode === "create"}
                      onChange={() =>
                        !(isSaving || uploading) && setMode("create")
                      }
                      disabled={isSaving || uploading}
                      className="hidden"
                    />
                    Hinzufügen
                  </label>
                  <label
                    className={`flex items-center px-4 py-2 border rounded cursor-pointer transition-all border-prim ${
                      mode === "update"
                        ? "bg-prim text-white"
                        : "text-prim  hover:bg-prim hover:text-white"
                    } ${
                      isSaving || uploading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="action"
                      value="update"
                      checked={mode === "update"}
                      onChange={() =>
                        !(isSaving || uploading) && setMode("update")
                      }
                      disabled={isSaving || uploading}
                      className="hidden"
                    />
                    Ändern
                  </label>
                  <label
                    className={`flex items-center px-4 py-2 border rounded cursor-pointer transition-all border-red-500 ${
                      mode === "delete"
                        ? "bg-red-500 text-white"
                        : "text-red-500  hover:bg-red-500 hover:text-white"
                    } ${
                      isSaving || uploading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="action"
                      value="delete"
                      checked={mode === "delete"}
                      onChange={() =>
                        !(isSaving || uploading) && setMode("delete")
                      }
                      disabled={isSaving || uploading}
                      className="hidden"
                    />
                    Löschen
                  </label>
                </div>
              </div>
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
