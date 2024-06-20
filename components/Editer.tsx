"use client";

import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";
import Toolbar from "./Toolbar";

export default function Editerr() {
  const [state, setState] = useState(() => EditorState.createEmpty());

  const onChange = (editerState: EditorState) => {
    setState(editerState);
  };

  return (
    <div className='dark:bg-slate-800 bg-slate-300 dark:text-white text-black w-full h-full p-2 rounded-md flex flex-col gap-2'>
      <Toolbar />
      <Editor editorState={state} onChange={onChange} />
    </div>
  );
}
