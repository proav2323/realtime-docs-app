import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utill/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { docId: string } }
) {
  const { name } = await req.json();

  if (!name || !params.docId) {
    return new NextResponse("no data", { status: 404 });
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("login first", { status: 401 });
  }

  const doc = await db.doc.update({
    where: { id: params.docId, createdById: currentUser.id },
    data: { name: name },
  });

  return NextResponse.json(doc);
}
