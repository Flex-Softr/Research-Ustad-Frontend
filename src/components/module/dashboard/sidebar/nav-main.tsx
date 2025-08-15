"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getFilteredNavItems, type NavItem } from "./nav-items";

export function NavMain({
  userRole,
}: {
  userRole: string;
}) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const isCollapsed = false; // Always expanded for simplicity

  // Get filtered navigation items based on user role
  const items = getFilteredNavItems(userRole);

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

  const renderNavItem = (item: NavItem, isSubItem = false) => {
    const isActive =
      pathname === item.url || pathname.startsWith(item.url + "/");
    const hasSubItems = item.items && item.items.length > 0;
    const expanded = isExpanded(item.title);

    const itemContent = (
      <div className="flex items-center space-x-3">
        {item.icon && (
          <item.icon
            className={`h-4 w-4 ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`}
          />
        )}
        <span className="font-medium flex-1 text-left">{item.title}</span>
        {hasSubItems && !isSubItem && (
          <ChevronRight
            className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${
              expanded ? "rotate-90" : ""
            }`}
          />
        )}
      </div>
    );

    const itemClasses = `flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 w-full ${
      isActive
        ? "bg-blue-50 text-blue-700 font-medium"
        : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
    }`;

    if (hasSubItems && !isSubItem) {
      return (
        <button
          onClick={() => toggleExpanded(item.title)}
          className={itemClasses}
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

        return (
          <div key={item.title}>
            {renderNavItem(item)}

            {hasSubItems && (
              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-4">
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
      })}
    </div>
  );
}
