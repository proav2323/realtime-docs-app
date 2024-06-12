import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/utill/db";

export default async function getCurrentUser() {
  const session = cookies().get("token");

  if (!session) {
    return null;
  }

  const decode = jwt.verify(
    session.value,
    process.env.SECRET ?? "THISSBJSBDJSBFJBDSJBFJDBSF DSFDSJFJDSB"
  );

  if (!decode || typeof decode === "string") {
    return null;
  }

  const user = await db.user.findUnique({
    where: { email: decode.email },
  });
  return user;
}
