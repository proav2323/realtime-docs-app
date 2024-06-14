import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col h-full justify-start items-start w-full'>
      <Navbar />
      {children}
    </div>
  );
}
