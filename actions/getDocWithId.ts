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

  const doc = await db.doc.findMany({
    where: {
      AND: [
        { id: id },
        {
          OR: [
            { createdById: currentUser.id },
            { member: { some: { userId: currentUser.id, docId: id } } },
          ],
        },
      ],
    },
    include: {
      member: true,
    },
  });

  return doc;
}
