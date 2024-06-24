"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import ImageExt from "@tiptap/extension-image";
import Align from "@tiptap/extension-text-align";
export default function Editerr() {
  const editorRef = useRef(null);
  const [model, setModel] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Underline,
      ImageExt,
      Align.configure({ types: ["heading", "paragraph"] }),
    ],
    content: model,
  });

  const format = [""];
  return (
    <div className='dark:text-white text-black w-full h-full rounded-md flex flex-col'>
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className='w-full max-h-[85vh] min-h-[85vh] overflow-y-scroll p-2 rounded-b-md outline-none focus:outline-none dark:text-white text-black border-none focus:border-none'
      />
    </div>
  );
}
