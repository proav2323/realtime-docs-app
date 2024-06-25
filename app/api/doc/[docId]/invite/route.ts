import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utill/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { docId: string } }
) {
  const { email, role, createdById } = await req.json();
  const currentUser = await getCurrentUser();

  if (!email || !role || !params.docId || !currentUser || !createdById) {
    return new NextResponse("no data", { status: 404 });
  }

  if (currentUser.id !== createdById) {
    return new NextResponse("not admin", { status: 404 });
  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return new NextResponse("no user found with this email", { status: 404 });
  }
  const member = await db.member.findMany({
    where: {
      docId: params.docId,
      userId: user.id,
    },
  });

  if (member.length !== 0) {
    return new NextResponse("user is already invited", { status: 401 });
  }

  const newMember = await db.member.create({
    data: {
      role: role,
      userId: user.id,
      docId: params.docId,
    },
  });

  return NextResponse.json(newMember);
}
