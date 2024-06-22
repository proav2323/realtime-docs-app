import getDocWitHid from "@/actions/getDocWithId";
import DocEdit from "@/components/DocEdit";
import Editer from "@/components/Editer";
import { doc } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default async function page({ params }: { params: { docId: string } }) {
  const doc: doc | null = await getDocWitHid(params.docId);

  if (!doc) {
    toast.error("doc not found");
    return redirect("/");
  }
  return (
    <div className='flex flex-col justify-between items-start gap-2 w-full h-full edit'>
      <DocEdit name={doc.name} id={doc.id} />
      <Editer />
    </div>
  );
}
