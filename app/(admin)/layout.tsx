import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyAdminSessionToken } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const session = token ? verifyAdminSessionToken(token) : null;

  if (!session) {
    redirect("/admin/login");
  }

  const adminUser = await prisma.adminUser.findUnique({
    where: {
      id: session.userId,
    },
  });

  if (!adminUser) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
