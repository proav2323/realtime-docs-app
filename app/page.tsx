import getCurrentUser from "@/actions/getCurrentUser";
import Heading from "@/components/ui/Heading";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoginModel from "@/components/ui/models/IntialModel";

export default async function Home() {
  const currentuser = await getCurrentUser();
  if (currentuser) {
    return redirect("/app");
  }

  return <LoginModel open data />;
}
