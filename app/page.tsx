import getCurrentUser from "@/actions/getCurrentUser";
import Heading from "@/components/ui/Heading";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoginModel from "@/components/ui/models/IntialModel";

export const loginFormSchema = z.object({
  email: z
    .string({ message: "email is required" })
    .email({ message: "email not valid" }),

  password: z
    .string({ message: "passwor dis required" })
    .min(8, { message: "password should be minimum of 8 characters" }),
});

export default async function Home() {
  const currentuser = await getCurrentUser();
  if (currentuser) {
    return redirect("/app");
  }

  return <LoginModel open data />;
}
