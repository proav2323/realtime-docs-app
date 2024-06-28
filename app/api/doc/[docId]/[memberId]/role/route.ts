import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utill/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { docId: string; memberId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { role } = await req.json();

    if (!role || !params.docId || !params.memberId) {
      return new NextResponse("no data", { status: 404 });
    }

    if (!currentUser) {
      return new NextResponse("login first", { status: 404 });
    }

    const doc = await db.doc.findUnique({
      where: {
        id: params.docId,
      },
    });

    if (!doc) {
      return new NextResponse("no document", { status: 401 });
    }

    if (currentUser.id !== doc.createdById) {
      return new NextResponse("permission not allowed", { status: 400 });
    }

    const member = await db.member.update({
      where: {
        id: params.memberId,
        docId: params.docId,
      },
      data: {
        role: role,
      },
    });

    const docG = await db.doc.findUnique({
      where: {
        id: params.docId,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });
    console.log(docG);

    return NextResponse.json(docG);
  } catch (Err: any) {
    console.log(Err);
    return new NextResponse(Err.message);
  }
}
