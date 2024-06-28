"use client";

import React, { useState } from "react";
import { useModal } from "../hooks/useModel.store";
import { Dialog, DialogContent } from "../dialog";
import Heading from "../Heading";
import { ScrollArea } from "../scroll-area";
import MemberCard from "../MemberCard";
import { Button } from "../button";
import AddMember from "../AddMember";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ShareModel() {
  const { onOpen, onClose, isOpen, type, data } = useModal();
  const open = isOpen && type === "share";
  const { currentUser, doc } = data;
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("VIEWER");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!currentUser || !doc) {
    return;
  }

  const members = doc.member.filter((dat) => dat.userId !== currentUser.id);
  const invite = () => {
    if (email !== "" && role !== "") {
      if (email === currentUser.email) {
        toast.error("can't add admin email");
        return;
      }
      setLoading(true);
      axios
        .post(`/api/doc/${doc.id}/invite`, {
          email: email,
          role: role,
          createdById: doc.createdById,
        })
        .then((data) => {
          toast.success("invite sent");
          setEmail("");
          setRole("");
          router.refresh();
        })
        .catch((err: any) => {
          toast.error(err.response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("fill the fields");
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className='flex flex-col gap-5 w-full overflow-y-scroll noScroll max-h-screen min-h-fit h-fit'>
        <Heading
          title='add callobrators'
          subtitle='share this document with othes to edit'
        />

        <AddMember
          email={email}
          setEmail={setEmail}
          role={role}
          setRole={setRole}
          loading={loading}
        />

        {members.length >= 1 && (
          <ScrollArea className='flex flex-col gap-2 justify-start items-start md:h-[20vh] h-[30vh]'>
            {members.map((data) => (
              <MemberCard
                key={data.id}
                member={data}
                newM={false}
                currentUser={currentUser}
              />
            ))}
          </ScrollArea>
        )}

        <Button className='self-end' onClick={() => invite()}>
          Invite
        </Button>
      </DialogContent>
    </Dialog>
  );
}
