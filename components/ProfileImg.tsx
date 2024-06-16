"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { user } from "@prisma/client";

import React from "react";

export default function ProfileImg({ currentUser }: { currentUser: user }) {
  const fullName = currentUser.name.split(" ");
  return (
    <Avatar className='cursor-pointer'>
      <AvatarImage src={currentUser.profileImg ?? ""} />
      <AvatarFallback>
        {fullName[0].charAt(0)}
        {fullName[1].charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
