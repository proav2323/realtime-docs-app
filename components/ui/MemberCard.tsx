"use client";

import { memberWithCreatedBy } from "@/types";
import React from "react";

export default function MemberCard({
  member,
  email,
  role,
  newM,
}: {
  member?: memberWithCreatedBy;
  newM: boolean;
  email?: string;
  role?: string;
}): React.JSX.Element {
  return (
    <>
      {newM === true ? (
        <div className='flex flex-row justify-start items-start w-full gap-2'>
          <span className='flex-1 w-full text-lg font-bold'>{email}</span>
          <span className='text-sm font-semibold'>{role}</span>
        </div>
      ) : (
        <div>not new</div>
      )}
    </>
  );
}
