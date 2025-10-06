"use client";
import { headingsPlugin } from "@mdxeditor/editor";
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

export default function ProjectDescEditor({
  initialValue,
  isAdmin,
}: {
  initialValue: string;
  isAdmin: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  if (editing) {
    return (
      <div className="space-y-4">
        <MDXEditor
          className="dark-theme dark-editor"
          markdown={value}
          onChange={(e) => setValue(e || "")}
          plugins={[
            headingsPlugin(),
            linkDialogPlugin(),
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
          contentEditableClassName="prose prose-xl dark:prose-invert max-w-none !px-0"
        />
        <div className="flex gap-2">
          <button
            onClick={() => {
              console.log(value)
              setEditing(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={() => {
              setValue(initialValue);
              setEditing(false);
            }}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="prose prose-xl dark:prose-invert max-w-none single-break">
        <Markdown>{value}</Markdown>
      </div>
      <button
        onClick={() => setEditing(true)}
        className="absolute top-0 right-0 px-3 py-1 text-sm bg-gray-200 rounded"
      >
        Edit
      </button>
    </div>
  );
}
