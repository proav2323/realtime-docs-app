import { NextResponse } from "next/server";
import getCurrentUser from "./getCurrentUser";
import { db } from "@/utill/db";

export default async function getUserDocs() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  const useDocs = await db.doc.findMany({
    where: {
      OR: [
        { createdById: currentUser.id },
        { member: { some: { userId: currentUser.id } } },
      ],
    },
    include: {
      createdBy: true,
    },
    orderBy: {
      updated_at: "desc",
    },
  });

  return useDocs;
}
