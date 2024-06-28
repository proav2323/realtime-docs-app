"use client";

import { memberWithCreatedBy } from "@/types";
import React, { useState } from "react";
import ProfileImg from "../ProfileImg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useModal } from "./hooks/useModel.store";
import { user } from "@prisma/client";

export default function MemberCard({
  member,
  email,
  role,
  newM,
  currentUser,
  isEdit = false,
}: {
  member?: memberWithCreatedBy;
  newM: boolean;
  email?: string;
  role?: string;
  currentUser: user;
  isEdit?: boolean;
}): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { onOpen } = useModal();

  if (newM === false && !member) {
    return <span>somethign went wrong</span>;
  }

  const change = (chnage: string) => {
    if (!isEdit || !chnage || !member) {
      return;
    }

    setLoading(true);
    axios
      .put(`/api/doc/${member!.docId}/${member!.id}/role/`, { role: chnage })
      .then((data) => {
        toast.success("permission updated");
        console.log(data.data);
        onOpen(isEdit ? "manageAccess" : "share", {
          currentUser: currentUser,
          doc: data.data ?? undefined,
        });
        router.refresh();
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {newM === true ? (
        <div className='flex flex-row justify-start items-start w-full gap-2'>
          <span className='flex-1 w-full text-lg font-bold'>{email}</span>
          <span className='text-sm font-semibold'>{role}</span>
        </div>
      ) : (
        <div className='flex flex-row justify-start w-full items-center gap-2'>
          <ProfileImg currentUser={member!.user} />
          <div className='flex flex-col gap-2 flex-1 w-full justify-start items-start'>
            <span className='text-xl font-bold'>{member!.user.name}</span>
            <span className='dark:text-neutral-700 font-semibold text-sm text-neutral-200'>
              {member!.user.email}
            </span>
          </div>
          <Select
            value={member!.role}
            onValueChange={(value) => change(value)}
            disabled={loading || isEdit === false ? true : false}
          >
            <SelectTrigger className='w-[180px] bg-transparent rounded-l-none outline-none border-none'>
              <SelectValue placeholder='Role' />
            </SelectTrigger>
            <SelectContent className=''>
              <SelectItem value='VIEWER'>Viewer</SelectItem>
              <SelectItem value='EDITER'>EDITOR</SelectItem>
              <SelectItem value='ADMIN'>Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
}
