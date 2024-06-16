import { user } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./button";
import { Plus, Search } from "lucide-react";
import ProfileImg from "../ProfileImg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export default function Navbar({ currentUser }: { currentUser: user }) {
  return (
    <>
      <div className='hidden md:flex flex-row justify-between items-center sticky top-0 w-full h-[60px] dark:bg-slate-950 bg-slate-200 dark:text-white text-black px-2 py-2'>
        <div className='flex flex-row gap-2 items-center justify-center'>
          <span className='text-xl font-bold'>Docs</span>
        </div>

        <div className='flex flex-row gap-2 items-center justify-center'>
          <div className='md:w-[40vw] lg:w-[30vw] xl:w-[20vw] relative dark:text-white text-black gap-0 flex flex-row items-center justify-center'>
            <div className='dark:bg-slate-800 bg-slate-100 dark:text-white text-black rounded-l-full p-2 h-[40px] flex justify-center items-center'>
              <Search size={18} className='' />
            </div>
            <input
              type='search'
              className='px-0 py-2 w-full dark:bg-slate-800 rounded-r-full bg-slate-100 outline-none border-none h-[40px]'
              placeholder='Search Documents'
            />
          </div>
          <Button variant={"outline"}>
            <Plus />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ProfileImg currentUser={currentUser} />
            </DropdownMenuTrigger>
            <DropdownMenuContent></DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='flex md:hidden flex-col gap-2 w-full sticky top-0 h-[110px] dark:bg-slate-950 bg-slate-200 dark:text-white text-black px-2 py-2'>
        <div className='flex flex-row justify-between items-center w-full'>
          <div className='flex flex-row gap-2 items-center justify-center'>
            <span className='text-xl font-bold'>Docs</span>
          </div>

          <div className='flex flex-row gap-2 items-center justify-center'>
            <Button variant={"outline"}>
              <Plus />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ProfileImg currentUser={currentUser} />
              </DropdownMenuTrigger>
              <DropdownMenuContent></DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='w-full relative dark:text-white text-black gap-0 flex flex-row items-center justify-center'>
          <div className='dark:bg-slate-800 bg-slate-100 dark:text-white text-black rounded-l-full p-2 h-[40px] flex justify-center items-center'>
            <Search size={18} className='' />
          </div>
          <input
            type='search'
            className='px-0 py-2 w-full dark:bg-slate-800 rounded-r-full bg-slate-100 outline-none border-none h-[40px]'
            placeholder='Search Documents'
          />
        </div>
      </div>
    </>
  );
}
