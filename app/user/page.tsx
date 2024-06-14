import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  return <div>page</div>;
}
