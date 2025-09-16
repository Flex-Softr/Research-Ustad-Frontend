"use client";

import Link from "next/link";
import * as React from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { GetAllResearchPaperPublic } from "@/services/allreserchPaper";

// Research Wing submenu items
const researchWingItems = [
  { name: "Publication", href: "/published" },
  { name: "Ongoing Projects", href: "/ongoing-projects" },
  {
    name: "International Conference",
    href: "/international-conferences",
  },
  { name: "Achievements", href: "/achievements" },
];

export function DroopDown() {
  const [papers, setPapers] = React.useState([]);
  const pathname = usePathname();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await GetAllResearchPaperPublic();
      setPapers(data?.data);
    };

    fetchData();
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "hover:text-brand-secondary focus:text-brand-secondary",
                isActive("/") && "text-brand-secondary font-semibold bg-gray-100"
              )}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Research Wing Dropdown */}
        <NavigationMenuItem className="cursor-pointer">
          <NavigationMenuTrigger
            className={cn(
              "hover:!text-brand-secondary focus:!text-brand-secondary",
              (isActive("/published") ||
                isActive("/ongoing-projects") ||
                isActive("/international-conferences") ||
                isActive("/achievements")) &&
                "text-brand-secondary font-semibold bg-gray-100"
            )}
          >
            Research Wing
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[200px] bg-white ">
              {researchWingItems?.map((item, index) => (
                <ListItem
                  key={item.name}
                  title={item.name}
                  href={item.href}
                  isLast={index === researchWingItems?.length - 1}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/team-members" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "hover:text-brand-secondary focus:text-brand-secondary",
                isActive("/team-members") &&
                  "text-brand-secondary font-semibold bg-gray-100"
              )}
            >
              Team Member
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/course" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "hover:text-brand-secondary focus:text-brand-secondary",
                isActive("/course") && "text-brand-secondary font-semibold bg-gray-100"
              )}
            >
              Courses
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/event" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "hover:text-brand-secondary focus:text-brand-secondary",
                isActive("/event") && "text-brand-secondary font-semibold bg-gray-100"
              )}
            >
              Events
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "hover:text-brand-secondary focus:text-brand-secondary",
                isActive("/blog") && "text-brand-secondary font-semibold bg-gray-100"
              )}
            >
              Blogs
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

    
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "hover:text-brand-secondary focus:text-brand-secondary",
                isActive("/contact") && "text-brand-secondary font-semibold bg-gray-100"
              )}
            >
              Contact Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    isLast?: boolean;
  }
>(({ className, title, children, isLast, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink className="rounded-none" asChild>
        <Link
          href={href}
          className={cn(
            "block select-none p-3 leading-none no-underline outline-none transition-colors rounded-none",
            !isLast && "border-b border-gray-300",
            className
          )}
          {...props}
        >
          <div className="text-sm text-black hover:text-brand-secondary transition-colors">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
