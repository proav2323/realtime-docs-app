"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import logo from "../public/icon.png";
import axios from "axios";
import toast from "react-hot-toast";

export default function DocEdit({ name, id }: { name: string; id: string }) {
  const router = useRouter();
  const [value, setValue] = useState(name);
  const [isFocusing, setIsFocusing] = useState(false);

  const onChange = async (e: any) => {
    const text = value;

    if (text === name || !isFocusing) {
      return;
    }

    const data = await axios.put(`/api/doc/${id}/name`, { name: text });

    if (data.status === 200) {
      router.refresh();
    } else {
      toast.error("something went wrong");
      router.refresh();
    }

    setIsFocusing(false);
  };

  return (
    <div className='w-full p-2  justify-start flex flex-row items-center gap-2'>
      <Image
        onClick={() => router.push("/")}
        src={logo}
        width={30}
        height={30}
        alt='logo'
        className='cursor-pointer'
      />
      <input
        className=' p-2 md:w-[20vw] w-[90vw] focus:outline bg-transparent rounded-md h-[25px] dark:focus:outline-white focus:outline-black'
        value={value}
        placeholder=''
        onFocus={() => setIsFocusing(true)}
        onBlur={(e) => onChange(e)}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
