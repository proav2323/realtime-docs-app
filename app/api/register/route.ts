import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/utill/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return new NextResponse("no data", { status: 404 });
    }

    const hash = await bcrypt.hash(password, 12);

    const foundUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (foundUser) {
      return new NextResponse("user found with email login", { status: 401 });
    }

    const user = await db.user.create({
      data: {
        email: email,
        password: hash,
        name: name,
      },
    });

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
