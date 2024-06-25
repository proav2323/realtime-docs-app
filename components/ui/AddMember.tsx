"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLE } from "@prisma/client";
import { Button } from "./button";

export default function AddMember({
  email,
  setEmail,
  role,
  setRole,
  loading,
}: {
  email: string;
  setEmail: any;
  role: string;
  setRole: any;
  loading: boolean;
}) {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <div
        className='flex flex-row w-full gap-2 rounded-md dark:bg-neutral-800 bg-neutral-200 disabled:opacity-50'
        aria-disabled={loading}
      >
        <input
          value={email}
          disabled={loading}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          className='p-2 bg-transparent flex-1 w-full rounded-l-md dark:text-white text-black outline-none border-none'
        />
        <Select
          value={role}
          onValueChange={(value) => setRole(value)}
          disabled={loading}
        >
          <SelectTrigger className='w-[180px] bg-transparent rounded-l-none outline-none border-none'>
            <SelectValue placeholder='Role' />
          </SelectTrigger>
          <SelectContent className=''>
            <SelectItem value='VIEWER'>Viewer</SelectItem>
            <SelectItem value='EDITER'>EDITOR</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
