import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/utill/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse("no data", { status: 404 });
    }

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new NextResponse("no user found", { status: 401 });
    }

    const hash = await bcrypt.compare(password, user.password);

    if (hash) {
      return new NextResponse("wrong password", { status: 404 });
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.SECRET ?? "THISSBJSBDJSBFJBDSJBFJDBSF DSFDSJFJDSB"
    );
    cookies().set("token", token);

    return NextResponse.json(user);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}
