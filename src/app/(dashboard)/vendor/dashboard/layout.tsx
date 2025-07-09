import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import getCurrentUser from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  return <DashboardLayout user={user} type="mahasiswa">{children}</DashboardLayout>;
}
