"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export default function Editerr() {
  const editorRef = useRef(null);
  const [model, setModel] = useState("");
  const onHandleChange = (e: any) => {
    setModel(e);
  };
  return (
    <div className='dark:bg-slate-800 bg-slate-300 dark:text-white text-black w-full h-full rounded-md flex flex-col gap-2'>
      <ReactQuill value={model} onChange={onHandleChange} />
    </div>
  );
}
