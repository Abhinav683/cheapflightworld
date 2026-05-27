"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      {children}

      {!isAdminRoute && <Footer />}
    </>
  );
}