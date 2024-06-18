import { doc, member, user } from "@prisma/client";

export type userWithDoc = Omit<user, "docs" | "member"> & {
  docs: doc[];
  member: member[];
};
