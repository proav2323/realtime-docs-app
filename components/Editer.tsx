"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import ImageExt from "@tiptap/extension-image";
import Align from "@tiptap/extension-text-align";
import { doc } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
export default function Editerr({
  doc,
  canEdit,
}: {
  doc: doc;
  canEdit: boolean;
}) {
  const editorRef = useRef(null);
  const [model, setModel] = useState(doc.Text);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Underline,
      ImageExt,
      Align.configure({ types: ["heading", "paragraph"] }),
    ],
    content: model,
    onUpdate: (editor) => {
      setModel(editor.editor.getHTML());
    },
    editable: canEdit,
  });

  const handleSave = () => {
    axios
      .put(`/api/doc/${doc.id}/save`, { text: model })
      .then(() => {
        toast.success("document saved");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <div className='dark:text-white text-black w-full h-full rounded-md flex flex-col'>
      <Toolbar canEdit={canEdit} editor={editor} handleSave={handleSave} />
      <EditorContent
        editor={editor}
        className='w-full max-h-[85vh] min-h-[85vh] overflow-y-scroll p-2 rounded-b-md outline-none focus:outline-none dark:text-white text-black border-none focus:border-none'
      />
    </div>
  );
}
