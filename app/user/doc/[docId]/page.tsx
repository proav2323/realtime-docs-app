import getCurrentUser from "@/actions/getCurrentUser";
import getDocWitHid from "@/actions/getDocWithId";
import DocEdit from "@/components/DocEdit";
import Editer from "@/components/Editer";
import { docWithMmeber } from "@/types";
import { doc } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default async function page({ params }: { params: { docId: string } }) {
  const data = await getDocWitHid(params.docId);
  const user = await getCurrentUser();

  if (!data || !user) {
    toast.error("doc not found");
    return redirect("/");
  }
  const doc: docWithMmeber = data[0];
  const host = doc.createdById === user.id;
  const member = doc.member.find((data) => data.userId === user.id);
  const canEdit = host ? true : member ? member.role === "EDITER" ? true : false : false

  return (
    <div className='flex flex-col justify-between items-start gap-2 w-full h-full edit'>
      <DocEdit name={doc.name} id={doc.id} />
      <Editer doc={doc} canEdit={canEdit} />
    </div>
  );
}
