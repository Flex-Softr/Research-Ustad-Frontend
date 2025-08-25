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
  { name: "Publication", href: "/allpapers" },
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
                isActive("/") && "text-brand-secondary font-semibold "
              )}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Research Wing Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "hover:text-brand-secondary focus:text-brand-secondary",
              (isActive("/allpapers") ||
                isActive("/ongoing-projects") ||
                isActive("/international-conferences") ||
                isActive("/achievements")) &&
                "text-brand-secondary font-semibold"
            )}
          >
            Research Wing
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-1 p-4 md:w-[300px] lg:w-[300px]">
              {researchWingItems.map((item) => (
                <ListItem
                  key={item.name}
                  title={item.name}
                  href={item.href}
                ></ListItem>
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
                  "text-brand-secondary font-semibold"
              )}
            >
              Team Member
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "hover:text-brand-secondary focus:text-brand-secondary",
                isActive("/blog") && "text-brand-secondary font-semibold"
              )}
            >
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/course" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "hover:text-brand-secondary focus:text-brand-secondary",
                isActive("/course") && "text-brand-secondary font-semibold"
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
                isActive("/event") && "text-brand-secondary font-semibold"
              )}
            >
              Events
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "hover:text-brand-secondary focus:text-brand-secondary",
                isActive("/contact") && "text-brand-secondary font-semibold"
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
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
