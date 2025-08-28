"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    badge?: number;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
      badge?: number;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const isCollapsed = state === "collapsed";

  // Auto-expand items that contain the current active path
  useEffect(() => {
    if (!isCollapsed) {
      const newExpandedItems = new Set<string>();
      items.forEach((item) => {
        if (
          item.items &&
          item.items.some((subItem) => pathname === subItem.url)
        ) {
          newExpandedItems.add(item.title);
        }
      });
      setExpandedItems(newExpandedItems);
    }
  }, [pathname, items, isCollapsed]);

  const toggleExpanded = (itemTitle: string) => {
    if (isCollapsed) return; // Don't allow expansion when collapsed
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle);
      } else {
        newSet.add(itemTitle);
      }
      return newSet;
    });
  };

  const isExpanded = (itemTitle: string) => expandedItems.has(itemTitle);

  const renderNavItem = (item: any, isSubItem = false) => {
    const isActive =
      pathname === item.url || pathname.startsWith(item.url + "/");
    const hasSubItems = item.items && item.items.length > 0;
    const expanded = isExpanded(item.title);

    const itemContent = (
      <div
        className={`flex items-center ${
          isCollapsed ? "justify-center" : "space-x-3"
        }`}
      >
        <item.icon
          className={`h-4 w-4 ${isActive ? "text-primary" : "text-gray-400"}`}
        />
        {!isCollapsed && (
          <>
            <span
              className={`font-medium ${isSubItem ? "" : "flex-1 text-left"}`}
            >
              {item.title}
            </span>
            {item.badge && item.badge > 0 && (
              <Badge
                variant="destructive"
                className="ml-auto h-4 w-4 rounded-full p-0 text-[10px] font-medium flex items-center justify-center"
              >
                {item.badge}
              </Badge>
            )}
            {hasSubItems && !isSubItem && (
              <ChevronRight
                className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${
                  expanded ? "rotate-90" : ""
                }`}
              />
            )}
          </>
        )}
      </div>
    );

    const itemClasses = `flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
      isActive
        ? "bg-primary/10 text-primary border-r-2 border-primary"
        : "text-gray-600 hover:text-primary hover:bg-primary/5"
    } ${isCollapsed ? "justify-center" : ""}`;

    if (hasSubItems && !isSubItem) {
      return (
        <button
          onClick={() => toggleExpanded(item.title)}
          className={`w-full ${itemClasses}`}
        >
          {itemContent}
        </button>
      );
    }

    return (
      <Link href={item.url} className={itemClasses}>
        {itemContent}
      </Link>
    );
  };

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const hasSubItems = item.items && item.items.length > 0;
        const expanded = isExpanded(item.title);

        const navItem = (
          <div key={item.title}>
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>{renderNavItem(item)}</TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              renderNavItem(item)
            )}

            {hasSubItems && !isCollapsed && (
              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-6 mt-1 space-y-1">
                  {item.items?.map((subItem) => (
                    <div key={subItem.title}>
                      {renderNavItem(subItem, true)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

        return navItem;
      })}
    </div>
  );
}
