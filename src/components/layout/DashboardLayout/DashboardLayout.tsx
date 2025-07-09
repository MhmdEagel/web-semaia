import { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar/DashboardSidebar";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import { User } from "next-auth";
import { SIDEBAR_USER } from "./DashboardLayout.constants";


interface PropTypes {
  user: User;
  children: ReactNode;
  type: string;
}

export default function DashboardLayout(props: PropTypes) {
  const { children, user } = props;


  return (
    <SidebarProvider
      style={
        {
          "--header-height": "calc(var(--spacing) * 16)",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar user={user} sidebarItems={SIDEBAR_USER} />
      <SidebarInset>
        <div className="flex h-screen flex-col overflow-hidden">
          <DashboardHeader sidebarItems={SIDEBAR_USER} />
          <main className="flex flex-1 flex-col p-4 overflow-y-auto">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
