"use client";
import { headingsPlugin, linkPlugin } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  BlockTypeSelect,
  linkDialogPlugin,
  CreateLink,
} from "@mdxeditor/editor";

import { useState } from "react";
import Markdown from "react-markdown";
import { updateProject } from "@/lib/projects";
import { Project } from "@prisma/client";
import ProjectTitle from "./ProjectTitle";

export default function ProjectDescEditor({
  initialDesc,
  isAdmin,
  slug,
  initialTitle,
}: {
  initialDesc: string;
  isAdmin: boolean;
  slug: string;
  initialTitle: string;
}) {
  const [editing, setEditing] = useState(false);
  const [newDesc, setNewDesc] = useState(initialDesc);
  const [newTitle, setNewTitle] = useState(initialTitle);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!isAdmin) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const result = await updateProject(slug, {
        desc: newDesc,
        title: newTitle,
      });

      if (result.success) {
        setEditing(false);
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
    setNewDesc(initialDesc);
    setNewTitle(initialTitle);
    setSaveError(null);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="space-y-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="text-3xl md:text-3xl 1.5xl:text-4.5xl 2xl:text-5xl font-bold mb-4 xl:mb-4.5 2xl:mb-6 3xl:mb-7 text-center bg-prim py-1.5 px-2.5 rounded-lg w-full"
        />
        <MDXEditor
          className="dark-theme dark-editor"
          markdown={newDesc}
          onChange={(e) => setNewDesc(e || "")}
          plugins={[
            headingsPlugin(),
            linkDialogPlugin(),
            linkPlugin(),
            toolbarPlugin({
              toolbarClassName: "",
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <CreateLink />
                  <BlockTypeSelect />
                </>
              ),
            }),
          ]}
          contentEditableClassName="prose prose-lg 1.5xl:prose-xl 2xl:prose-2xl dark:prose-invert max-w-none !px-0"
        />
        <div className="flex gap-2">
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
    );
  }

  return (
    <div className="relative">
      <ProjectTitle title={newTitle} />
      <div className="prose prose-lg 1.5xl:prose-xl 2xl:prose-2xl dark:prose-invert max-w-none single-break">
        <Markdown>{newDesc}</Markdown>
      </div>
      <button
        onClick={() => setEditing(true)}
        className="px-3 py-2 mt-3 text-lg bg-prim rounded hover:cursor-pointer hover:bg-primd transition-all"
      >
        Bearbeiten
      </button>
    </div>
  );
}
