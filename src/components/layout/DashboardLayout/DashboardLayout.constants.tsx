import { Grid2x2, BoxIcon, Settings } from "lucide-react";

const DASHBOARD_BASE_URL = "/vendor";

const SIDEBAR_USER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: `${DASHBOARD_BASE_URL}/dashboard`,
    icon: <Grid2x2 />,
  },
  {
    key: "products",
    label: "Products",
    href: `${DASHBOARD_BASE_URL}/dashboard/products`,
    icon: <BoxIcon />,
  },
  {
    key: "setting",
    label: "Setting",
    href: `${DASHBOARD_BASE_URL}/dashboard/settings`,
    icon: <Settings />,
  },
];

export { SIDEBAR_USER };
