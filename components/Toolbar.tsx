"use client";

import { Editor } from "@tiptap/react";
import React from "react";
import { Toggle } from "./ui/toggle";
import {
  Bold,
  CodeSquare,
  Italic,
  List,
  Quote,
  Strikethrough,
  Underline,
} from "lucide-react";

export default function Toolbar({ editor }: { editor: Editor | null }) {
  const setBold = () => {
    if (!editor) {
      return;
    }
    if (editor.isActive("bold")) {
      editor.chain().focus().toggleBold().run();
    } else {
      editor.chain().focus().toggleBold().run();
    }
  };

  if (!editor) {
    return;
  }

  return (
    <div className='w-full h-[60px] overflow-x-scroll overflow-y-hidden noScroll dark:bg-slate-900 bg-slate-50 rounded-t-md flex flex-row gap-2 justify-start items-center p-2 border-none outline-none focus:border-none focus:outline-none'>
      <div
        className={`${
          editor.isActive("bold")
            ? "dark:bg-neutral-900 bg-neutral-500"
            : "dark:bg-neutral-800 bg-neutral-300"
        } p-2 rounded-md  hover:opacity-50 transition-all ease-in-out duration-200 cursor-pointer`}
        onClick={() => setBold()}
      >
        <Bold size={16} />
      </div>

      <div
        className={`${
          editor.isActive("italic")
            ? "dark:bg-neutral-900 bg-neutral-500"
            : "dark:bg-neutral-800 bg-neutral-300"
        } p-2 rounded-md  hover:opacity-50 transition-all ease-in-out duration-200 cursor-pointer`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </div>

      <div
        className={`${
          editor.isActive("underline")
            ? "dark:bg-neutral-900 bg-neutral-500"
            : "dark:bg-neutral-800 bg-neutral-300"
        } p-2 rounded-md  hover:opacity-50 transition-all ease-in-out duration-200 cursor-pointer`}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={16} />
      </div>

      <div
        className={`${
          editor.isActive("codeBlock")
            ? "dark:bg-neutral-900 bg-neutral-500"
            : "dark:bg-neutral-800 bg-neutral-300"
        } p-2 rounded-md  hover:opacity-50 transition-all ease-in-out duration-200 cursor-pointer`}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <CodeSquare size={16} />
      </div>

      <div
        className={`${
          editor.isActive("blockquote")
            ? "dark:bg-neutral-900 bg-neutral-500"
            : "dark:bg-neutral-800 bg-neutral-300"
        } p-2 rounded-md  hover:opacity-50 transition-all ease-in-out duration-200 cursor-pointer`}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={16} />
      </div>

      <div
        className={`${
          editor.isActive("bulletList")
            ? "dark:bg-neutral-900 bg-neutral-500"
            : "dark:bg-neutral-800 bg-neutral-300"
        } p-2 rounded-md  hover:opacity-50 transition-all ease-in-out duration-200 cursor-pointer`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </div>

      <div
        className={`${
          editor.isActive("strike")
            ? "dark:bg-neutral-900 bg-neutral-500"
            : "dark:bg-neutral-800 bg-neutral-300"
        } p-2 rounded-md  hover:opacity-50 transition-all ease-in-out duration-200 cursor-pointer`}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={16} />
      </div>
    </div>
  );
}
