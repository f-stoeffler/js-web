import { deleteProject, updateProjectsPagePart } from "@/lib/projects";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

export default function ProjectComp({
  children,
  title,
  slug,
  img,
  isPublic,
  featured,
  isAdmin,
  mainImageVer,
  setManualRefresh,
  manualRefresh,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  slug: string;
  img: string;
  isPublic: boolean;
  featured: boolean;
  isAdmin: boolean;
  mainImageVer: Date;
  setManualRefresh: Dispatch<SetStateAction<boolean>>;
  manualRefresh: boolean;
}>) {
  const [isPublicState, setIsPublicState] = useState(isPublic);
  const [loadingPublicBtn, setLoadingPublicBtn] = useState(false);
  const [featuredState, setFeaturedState] = useState(featured);
  const [loadingFeaturedBtn, setLoadingFeaturedBtn] = useState(false);
  const [deleteProtection, setDeleteProtection] = useState(0);

  const projectUpdatePublicTemplate: (
    slug: string,
    newPublic: boolean
  ) => Prisma.ProjectsUpdateInput = (slug, newPublic) => {
    return {
      projects: {
        update: {
          where: { slug: slug },
          data: {
            public: newPublic,
          },
        },
      },
    };
  };
  const projectUpdateFeaturedTemplate: (
    slug: string,
    newPublic: boolean
  ) => Prisma.ProjectsUpdateInput = (slug, newFeatured) => {
    return {
      projects: {
        update: {
          where: { slug: slug },
          data: {
            featured: newFeatured,
          },
        },
      },
    };
  };


  const handleDBUpdateFeatured = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFeaturedState(e.target.checked);
    try {
      setLoadingFeaturedBtn(true);
      const updatedProjects = await updateProjectsPagePart(
        projectUpdateFeaturedTemplate(slug, e.target.checked)
      );
      if (!updatedProjects.success) {
        throw new Error("failed updating Project");
      }
    } catch (error) {
      console.error("Fehler beim ändern des Projektes:", error);
    } finally {
      setLoadingFeaturedBtn(false);
    }
  };

  const handleDBUpdatePublic = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPublicState(e.target.checked);
    try {
      setLoadingPublicBtn(true);
      const updatedProjects = await updateProjectsPagePart(
        projectUpdatePublicTemplate(slug, e.target.checked)
      );
      if (!updatedProjects.success) {
        throw new Error("failed updating Project");
      }
    } catch (error) {
      console.error("Fehler beim ändern des Projektes:", error);
    } finally {
      setLoadingPublicBtn(false);
    }
  };

  const handleDBUpdateDelete = async () => {
    try {
      const updatedProjects = await deleteProject(slug);
      if (!updatedProjects) {
        throw new Error("failed updating Project");
      }
    } catch (error) {
      console.error("Fehler beim ändern des Projektes:", error);
    } finally {
      setManualRefresh(!manualRefresh);
    }
  };

  const handleDeleteProtectionEnter = () => {
    if (deleteProtection != 2) {
      setDeleteProtection(1);
    }
  };
  const handleDeleteProtectionLeave = () => {
    if (deleteProtection != 2) {
      setDeleteProtection(0);
    }
  };

  return (
    <Link
      href={`/project/${slug}`}
      className="striped-background sm:rounded-lg overflow-hidden border-y-4 sm:border-x-4 hover:border-priml border-bg2 hover:cursor-pointer transition-all active:border-primd flex flex-col"
    >
      <div className="w-full h-56 xxs:h-80 xs:h-100 sm:h-64 relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/project/${img}?v=${mainImageVer}`}
          fill
          alt="flowers"
          className="object-cover"
        />
      </div>
      <div className="px-6 py-4 grow flex flex-col">
        <h3 className="text-2xl mb-2">{title}</h3>
        <p>{children}</p>
        {isAdmin && (
          <>
            <div className="flex grow items-end mt-4">
              <div className="flex flex-col">
                <label onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    name="public"
                    checked={isPublicState}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={handleDBUpdatePublic}
                    disabled={loadingPublicBtn}
                  />{" "}
                  Öffentlich
                </label>
                <label onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    name="public"
                    checked={featuredState}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={handleDBUpdateFeatured}
                    disabled={loadingFeaturedBtn}
                  />{" "}
                  Highlight
                </label>
              </div>
              <div className="grow flex justify-end">
                <div
                  className={`absolute w-21 h-10 ${
                    deleteProtection === 2 && "hidden"
                  }`}
                  onMouseEnter={handleDeleteProtectionEnter}
                  onMouseLeave={handleDeleteProtectionLeave}
                >
                  <div
                    className={`h-full w-full bg-bg2/90 items-center justify-center rounded border-2 border-bg transition-all ${
                      deleteProtection === 1 ? "flex" : "hidden"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDeleteProtection(2);
                    }}
                  >
                    Schutz
                  </div>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 cursor-pointer py-1 px-2 rounded mt-1 mr-1 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDoubleClick={handleDBUpdateDelete}
                >
                  Löschen
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
