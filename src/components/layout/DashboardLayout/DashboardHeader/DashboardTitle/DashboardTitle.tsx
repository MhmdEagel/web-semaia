"use client";

import { SidebarItem } from "@/types/Dashboard";
import { usePathname } from "next/navigation";

interface PropTypes {
  sidebarItems: SidebarItem[];
}
export default function DashboardTitle(props: PropTypes) {
  const { sidebarItems } = props;
  const pathName = usePathname();
  const item = sidebarItems.find((item) => pathName === item.href);
  const title = item?.label;

  return <h1 className="text-base font-medium">{title}</h1>;
}
