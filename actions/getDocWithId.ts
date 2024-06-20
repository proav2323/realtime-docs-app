import { db } from "@/utill/db";
import getCurrentUser from "./getCurrentUser";

export default async function getDocWitHid(id: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  if (!id) {
    return null;
  }

  const doc = await db.doc.findUnique({ where: { id: id } });

  return doc;
}
