import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utill/db";
import { ROLE } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("login to create new doc", { status: 401 });
    }

    const { name } = await req.json();

    if (!name) {
      return new NextResponse("no name proivded", { status: 404 });
    }

    const InviteUrl = uuidv4();

    const newDoc = await db.doc.create({
      data: {
        Text: "",
        name: name,
        createdById: currentUser.id,
        member: { create: { role: "ADMIN", userId: currentUser.id } },
        inviteUrl: InviteUrl,
      },
    });

    return NextResponse.json(newDoc);
  } catch (Er: any) {
    return new NextResponse(Er.message, { status: 500 });
  }
}
