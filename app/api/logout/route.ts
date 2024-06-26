import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    cookies().delete("token");
    return new NextResponse("done", { status: 200 });
  } catch (er) {
    console.log(er);
  }
}
