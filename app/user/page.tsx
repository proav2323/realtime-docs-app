import getCurrentUser from "@/actions/getCurrentUser";
import getUserDocs from "@/actions/getUserDocs";
import { columns } from "@/components/ui/Columns";
import { DataTable } from "@/components/ui/DataTable";
import { docWithUser } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

export interface seachParamsIterface {
  search: string;
}

export default async function page({
  searchParams,
}: {
  searchParams?: seachParamsIterface;
}) {
  const currentUser = await getCurrentUser();
  const docs: docWithUser[] = await getUserDocs(searchParams);

  if (!currentUser) {
    return redirect("/");
  }

  return (
    <div className='p-3 flex flex-row w-full h-full'>
      <DataTable columns={columns} data={docs} />
    </div>
  );
}
