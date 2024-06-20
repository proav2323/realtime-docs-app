import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "@/components/ui/Navbar";
import NavbarProvider from "@/components/ui/NavbarProvider";
import { userWithDoc } from "@/types";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser: userWithDoc | null = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  return (
    <div className='flex flex-col h-full justify-start items-start w-full '>
      <NavbarProvider currentUser={currentUser} />
      {children}
    </div>
  );
}
