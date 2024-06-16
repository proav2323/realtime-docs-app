"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { user } from "@prisma/client";

export default function NavbarProvider({ currentUser }: { currentUser: user }) {
  const route = usePathname();
  return <>{route !== "/user/doc" && <Navbar currentUser={currentUser} />}</>;
}
