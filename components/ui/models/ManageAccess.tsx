"use client";

import React from "react";
import { Dialog, DialogContent } from "../dialog";
import { useModal } from "../hooks/useModel.store";
import Heading from "../Heading";
import MemberCard from "../MemberCard";

export default function ManageAccess() {
  const { onOpen, onClose, type, isOpen, data } = useModal();
  const open = type === "manageAccess" && isOpen;
  const { currentUser, doc } = data;
  if (!currentUser || !doc) {
    return null;
  }
  const memebrs = doc.member.filter((dat) => dat.id !== currentUser.id);
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className='flex flex-col gap-9 w-full h-fit max-h-screen overflow-h-scroll'>
        <Heading title='Manage Access' subtitle='chnage roles of the members' />
        {memebrs.map((data) => (
          <MemberCard
            member={data}
            key={data.id}
            newM={false}
            isEdit
            currentUser={currentUser}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
}
