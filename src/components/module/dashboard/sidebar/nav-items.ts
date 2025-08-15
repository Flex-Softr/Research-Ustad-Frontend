import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  User,
  BarChart3,
  BookOpen,
  MessageSquare,
  Bell,
  HelpCircle,
  List,
  Plus,
  UserCheck,
  ClipboardList,
  Building,
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: any;
  items?: NavItem[];
  allowedRoles?: string[];
}

export const dashboardNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    allowedRoles: ["superadmin", "admin", "agent"], // All roles can access dashboard
  },
  {
    title: "Company",
    url: "/dashboard/company",
    icon: Building,
    allowedRoles: ["superadmin", "admin"], // Only superadmin and admin can access company
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
    allowedRoles: ["superadmin", "admin"], // Only superadmin and admin can access users
  },
  {
    title: "Clients",
    url: "/dashboard/clients",
    icon: UserCheck,
    allowedRoles: ["superadmin", "admin", "agent"], // All roles can access clients
    items: [
      {
        title: "All Clients",
        url: "/dashboard/clients",
        icon: List,
        allowedRoles: ["superadmin", "admin", "agent"],
      },
      {
        title: "Clients Records",
        url: "/dashboard/clients-records",
        icon: ClipboardList,
        allowedRoles: ["superadmin", "admin", "agent"],
      },
    ],
  },
  {
    title: "Blogs",
    url: "/dashboard/blogs",
    icon: FileText,
    allowedRoles: ["superadmin", "admin"], // Only superadmin and admin can access blogs
    items: [
      {
        title: "All Blogs",
        url: "/dashboard/blogs/all",
        icon: List,
        allowedRoles: ["superadmin", "admin"],
      },
      {
        title: "Create Blog",
        url: "/dashboard/blogs/create",
        icon: Plus,
        allowedRoles: ["superadmin", "admin"],
      },
    ],
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
    allowedRoles: ["superadmin", "admin", "agent"], // All roles can access profile
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    allowedRoles: ["superadmin", "admin", "agent"], // All roles can access settings
  },
];

// Helper function to filter navigation items based on user role
export const getFilteredNavItems = (userRole: string): NavItem[] => {
  return dashboardNavItems.filter((item) => {
    // If no allowedRoles specified, allow all roles
    if (!item.allowedRoles) return true;

    // Check if user role is in allowed roles
    const hasAccess = item.allowedRoles.includes(userRole);

    // If item has sub-items, filter them too
    if (item.items && item.items.length > 0) {
      const filteredItems = item.items.filter((subItem) => {
        if (!subItem.allowedRoles) return true;
        return subItem.allowedRoles.includes(userRole);
      });

      // Only show parent item if it has accessible sub-items or direct access
      return hasAccess && (filteredItems.length > 0 || !item.items);
    }

    return hasAccess;
  });
};
