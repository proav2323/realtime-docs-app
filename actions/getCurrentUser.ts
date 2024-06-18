"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { db } from "@/utill/db";

export default async function getCurrentUser() {
  const session = cookies().get("token");

  if (!session || !session.value || !session.name) {
    return null;
  }
  let decode;
  try {
    console.log(session.value);
    decode = jwt.verify(
      session.value,
      process.env.SECRET ?? "THISSBJSBDJSBFJBDSJBFJDBSF DSFDSJFJDSB"
    );
  } catch (Err) {
    console.log(Err);
    return null;
  }

  if (!decode || typeof decode === "string") {
    return null;
  }

  const user = await db.user.findUnique({
    where: { email: decode.email },
    include: { docs: true, member: true },
  });
  return user;
}
