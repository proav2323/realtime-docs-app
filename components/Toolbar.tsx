"use client";

import { Editor } from "@tiptap/react";
import React, { useState } from "react";
import { Toggle } from "./ui/toggle";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  CodeSquare,
  Image,
  Italic,
  Link,
  List,
  Quote,
  Save,
  Strikethrough,
  Underline,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

export default function Toolbar({
  editor,
  handleSave,
  canEdit,
}: {
  editor: Editor | null;
  handleSave: any;
  canEdit: boolean;
}) {
  const [link, setLink] = useState("");
  const [imageLink, setImageLink] = useState("");
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

  if (!editor || !canEdit) {
    return;
  }

  const addLink = () => {
    if (link) {
      editor.commands.setLink({ href: link });
      setLink("");
    }
  };

  const addImage = () => {
    if (imageLink) {
      editor.commands.setImage({ src: imageLink });
      setImageLink("");
    }
  };

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
      <Popover>
        <PopoverTrigger>
          <div
            className={`${
              editor.isActive("link")
                ? "dark:bg-neutral-900 bg-neutral-500"
                : "dark:bg-neutral-800 bg-neutral-300"
            } p-2 rounded-md  hover:opacity-50 transition-all ease-in-out duration-200 cursor-pointer`}
          >
            <Link size={16} />
          </div>
        </PopoverTrigger>
        <PopoverContent className='flex flex-col justify-start items-center md:w-[30vw] w-[90vw] lg:w-[25vw] xl:w-[20vw] p-2 gap-2'>
          <input
            type='text'
            className='w-full p-2 rounded-md dark:bg-neutral-800 bg-neutral-200 dark:text-white text-black outline-none border-none'
            placeholder='Link'
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button onClick={() => addLink()}>Add</Button>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <div
            className={`${
              editor.isActive("image")
                ? "dark:bg-neutral-900 bg-neutral-500"
                : "dark:bg-neutral-800 bg-neutral-300"
            } p-2 rounded-md  hover:opacity-50 transition-all ease-in-out duration-200 cursor-pointer`}
          >
            <Image size={16} />
          </div>
        </PopoverTrigger>
        <PopoverContent className='flex flex-col justify-start items-center md:w-[30vw] w-[90vw] lg:w-[25vw] xl:w-[20vw] p-2 gap-2'>
          <input
            type='text'
            className='w-full p-2 rounded-md dark:bg-neutral-800 bg-neutral-200 dark:text-white text-black outline-none border-none'
            placeholder='Image Url'
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
          <Button onClick={() => addImage()}>Add</Button>
        </PopoverContent>
      </Popover>

      <div
        className={`${
          editor.isActive("align")
            ? "dark:bg-neutral-900 bg-neutral-500"
            : "dark:bg-neutral-800 bg-neutral-300"
        } p-2 rounded-md  hover:opacity-50 transition-all ease-in-out duration-200 cursor-pointer`}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft size={16} />
      </div>

      <div
        className={`${
          editor.isActive("align")
            ? "dark:bg-neutral-900 bg-neutral-500"
            : "dark:bg-neutral-800 bg-neutral-300"
        } p-2 rounded-md  hover:opacity-50 transition-all ease-in-out duration-200 cursor-pointer`}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter size={16} />
      </div>

      <div
        className={`${
          editor.isActive("textAlign")
            ? "dark:bg-neutral-900 bg-neutral-500"
            : "dark:bg-neutral-800 bg-neutral-300"
        } p-2 rounded-md  hover:opacity-50 transition-all ease-in-out duration-200 cursor-pointer`}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight size={16} />
      </div>

      <div
        onClick={() => handleSave()}
        className={`${"dark:bg-neutral-900 bg-neutral-500"} p-2 rounded-md  hover:opacity-50 transition-all ease-in-out duration-200 cursor-pointer`}
      >
        <Save size={16} />
      </div>
    </div>
  );
}
