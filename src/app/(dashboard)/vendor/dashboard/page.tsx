import { createMetadata } from "@/lib/metadata";
import Dashboard from "@/views/Vendor/Dashboard/Dashboard";

export const generateMetadata = () => createMetadata({ title: "Dashboard" });

export default function DashboardPage() {
  return (
    <Dashboard />
  )
}
