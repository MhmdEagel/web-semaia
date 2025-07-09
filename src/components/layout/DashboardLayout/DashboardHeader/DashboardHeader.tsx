import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarItem } from "@/types/Dashboard";
import DashboardTitle from "./DashboardTitle/DashboardTitle";


interface PropTypes {
  sidebarItems: SidebarItem[];
}

export default function DashboardHeader(props: PropTypes) {
  const { sidebarItems } = props;
  return (
    <header className="sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) shadow-sm">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <DashboardTitle sidebarItems={sidebarItems} />
      </div>
    </header>
  );
}
