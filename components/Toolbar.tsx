"use client";

import { EditorState, RichUtils } from "draft-js";
import { Toggle } from "@/components/ui/toggle";
import React from "react";
import { Bold } from "lucide-react";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export default function Toolbar({
  editer,
  onChange,
}: {
  editer: BaseEditor & ReactEditor;
  onChange: any;
}) {
  const onBoldClick = () => {};
  return (
    <div className='w-full h-[60px] overflow-x-scroll overflow-y-hidden noScroll dark:bg-slate-900 bg-slate-50 rounded-t-md flex flex-row gap-2 ju,stify-start items-center p-2'>
      <Toggle onToggle={onBoldClick}>
        <Bold size={16} />
      </Toggle>
    </div>
  );
}
