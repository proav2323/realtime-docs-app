import { NextResponse } from "next/server";
import getCurrentUser from "./getCurrentUser";
import { db } from "@/utill/db";
import { seachParamsIterface } from "@/app/user/page";

export default async function getUserDocs(searchParams?: seachParamsIterface) {
  const currentUser = await getCurrentUser();
  let query = {};

  if (!currentUser) {
    return [];
  }

  if (searchParams) {
    query = {
      name: { contains: searchParams.search },
      OR: [
        { createdById: currentUser.id },
        { member: { some: { userId: currentUser.id } } },
      ],
    };
  } else {
    query = {
      OR: [
        { createdById: currentUser.id },
        { member: { some: { userId: currentUser.id } } },
      ],
    };
  }

  const useDocs = await db.doc.findMany({
    where: query,
    include: {
      createdBy: true,
    },
    orderBy: {
      updated_at: "desc",
    },
  });

  return useDocs;
}
