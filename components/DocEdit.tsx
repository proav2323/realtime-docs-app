"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "../public/icon.png";
import axios from "axios";
import toast from "react-hot-toast";
import { user } from "@prisma/client";
import ProfileImg from "./ProfileImg";
import { Button } from "./ui/button";
import { useModal } from "./ui/hooks/useModel.store";
import { docWithMmeber } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IoSocket } from "@/utill/socket";
import { BluetoothConnectedIcon } from "lucide-react";

export default function DocEdit({
  name,
  id,
  doc,
  currentUser,
}: {
  name: string;
  id: string;
  currentUser: user;
  doc: docWithMmeber;
}) {
  const router = useRouter();
  const [value, setValue] = useState(name);
  const [isFocusing, setIsFocusing] = useState(false);
  const [connected, setConnected] = useState(IoSocket.connected);
  const [isClient, setIsClient] = useState(false);

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
  const { onOpen } = useModal();

  const logout = async () => {
    await axios.put("/api/logout");
    router.refresh();
  };

  useEffect(() => {
    IoSocket.on("connect", () => {
      IoSocket.emit("joinRoom", doc.inviteUrl);
      setConnected(true);
    });

    setIsClient(true);
  }, [doc.inviteUrl]);

  return (
    <div className='w-full p-2  justify-between flex md:flex-row flex-col items-center gap-2'>
      <div className='p-2 justify-start flex flex-row items-center gap-2'>
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

      <div className='p-2 justify-start flex flex-row items-center gap-2'>
        {isClient && connected === true ? (
          <span className='text-sm text-green-500'>Connected</span>
        ) : (
          <span className='text-sm text-red-500'>Connection Failed</span>
        )}
        {currentUser.id === doc.createdById && (
          <Button
            onClick={() =>
              onOpen("share", { currentUser: currentUser, doc: doc })
            }
          >
            Share
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ProfileImg currentUser={currentUser} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                onOpen("manageAccess", { currentUser: currentUser, doc: doc })
              }
            >
              Manage Access
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
