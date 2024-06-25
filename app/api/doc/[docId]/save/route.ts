import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utill/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { docId: string } }
) {
  try {
    const { text } = await req.json();

    if (!text || !params.docId) {
      return new NextResponse("no data", { status: 404 });
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("login first", { status: 401 });
    }

    const doc = await db.doc.updateMany({
      where: {
        AND: [
          { id: params.docId },
          {
            OR: [
              { createdById: currentUser.id },
              {
                member: {
                  some: {
                    docId: params.docId,
                    userId: currentUser.id,
                    role: "EDITER",
                  },
                },
              },
            ],
          },
        ],
      },
      data: { Text: text },
    });

    return NextResponse.json(doc);
  } catch (err: any) {
    console.log(err);
    return new NextResponse(err.message);
  }
}
