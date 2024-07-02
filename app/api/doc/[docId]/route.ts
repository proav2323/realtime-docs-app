import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utill/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { docId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("login first", { status: 401 });
  }

  if (!params.docId) {
    return new NextResponse("no id", { status: 401 });
  }

  const check = await db.doc.findUnique({
    where: {
      id: params.docId,
    },
  });

  if (!check) {
    return new NextResponse("no document found", { status: 404 });
  }

  if (check.createdById !== currentUser.id) {
    return new NextResponse("you are not allowed to do this action", {
      status: 401,
    });
  }
  const doc = await db.doc.delete({
    where: {
      id: params.docId,
      createdById: currentUser.id,
    },
  });

  return NextResponse.json(doc);
}
