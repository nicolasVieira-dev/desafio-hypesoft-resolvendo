import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  

  if (!session) {
    redirect("/");
  }

  return (
    <DashboardLayout session={session}>
      {children}
    </DashboardLayout>
  );
}