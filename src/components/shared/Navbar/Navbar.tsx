"use client";
import { DroopDown } from "@/components/ui/core/DropDown/DropDown";
import { Button } from "@/components/ui/core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCurrentUser, logout } from "@/services/AuthService";
import { Menu, X, LogIn, User, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDashboardUrl } from "@/lib/dashboardUtils";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Team Member", href: "/team-members" },
  { name: "Our Blogs", href: "/blog" },
  { name: "Event", href: "/event" },
  { name: "Course", href: "/course" },
  { name: "Contact Us", href: "/contact" },
];

// Research Wing submenu items for mobile
const researchWingItems = [
  { name: "Publication", href: "/published" },
  { name: "Ongoing Projects", href: "/ongoing-projects" },
  {
    name: "International Conference",
    href: "/international-conferences",
  },
  { name: "Achievements", href: "/achievements" },
];

type UserToken = {
  id: string;
  email: string;
  role: "user" | "admin" | "superAdmin";
  iat: number;
  exp: number;
};

// Helper function to convert JWT payload to UserToken
const convertJwtToUserToken = (jwtPayload: any): UserToken | null => {
  if (!jwtPayload || typeof jwtPayload !== "object") {
    return null;
  }

  return {
    id: jwtPayload.sub || jwtPayload.id || "",
    email: jwtPayload.email || "",
    role: jwtPayload.role || "user",
    iat: jwtPayload.iat || 0,
    exp: jwtPayload.exp || 0,
  };
};

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserToken | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const isCategoryExpanded = (category: string) => {
    return expandedCategories.includes(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      const jwtPayload = await getCurrentUser();
      const userToken = convertJwtToUserToken(jwtPayload);
      setUser(userToken);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogOut = () => {
    logout();
    setUser(null);
    router.push("/");
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolling
          ? "bg-white/95 shadow-lg backdrop-blur-md border-b border-gray-100"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto hidden lg:flex justify-between items-center px-6">
        <Link href="/" className="group flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={1000}
            height={100}
            className="w-20 h-20"
          />
          <h2 className="font-bold text-[22px] flex items-center transition-colors text-brand-primary group-hover:text-brand-secondary duration-300">
            Research{" "}
            <span className="group-hover:text-brand-primary text-brand-secondary transition-colors duration-300">
              Ustad
            </span>
          </h2>
        </Link>

        <div className="flex items-center space-x-8">
          {/* Desktop Navigation Menu */}
          <div>
            <DroopDown />
          </div>

          {/* Modern Login Button */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="primary"
                  size="md"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mt-2">
                <DropdownMenuItem className="cursor-pointer">
                  <Link
                    href={getDashboardUrl(user?.role || "")}
                    className="flex items-center w-full"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogOut}
                  className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button
                variant="primary"
                size="md"
                className="flex items-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden block">
        <div className=" bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100">
          <div className="flex justify-between items-center">
            <Link href="/" className="group">
            <Image src="/logo.png" alt="logo" width={1000} height={100} className="w-20 h-20" />
              {/* <h2 className="font-bold text-brand-secondary text-[20px] flex items-center transition-colors duration-300">
                Research
                <span className="text-brand-primary group-hover:text-brand-secondary transition-colors duration-300">
                  Ustad
                </span>
              </h2> */}
            </Link>
            <div className="flex items-center gap-3">
              {/* Mobile Login Button */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <User className="w-3 h-3" />
                      <span className="text-sm">Dashboard</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 mt-2">
                    <DropdownMenuItem className="cursor-pointer">
                      <Link
                        href={getDashboardUrl(user?.role || "")}
                        className="flex items-center w-full text-sm"
                      >
                        <User className="w-3 h-3 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogOut}
                      className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 text-sm"
                    >
                      <LogIn className="w-3 h-3 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <LogIn className="w-3 h-3" />
                    <span className="text-sm">Login</span>
                  </Button>
                </Link>
              )}

              {/* Mobile Menu */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger className="focus:outline-none cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  {open ? <X size={20} /> : <Menu size={20} />}
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0 bg-white">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Menu
                      </h2>
                    </div>

                    {/* Navigation Menu */}
                    <div className="flex-1 overflow-y-auto">
                      <nav className="py-2">
                        {/* Main Menu Items */}
                        {navLinks.map((link) => (
                          <div
                            key={link.name}
                            className="border-b border-gray-100"
                          >
                            <Link
                              href={link.href}
                              className={cn(
                                "flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-200",
                                isActive(link.href)
                                  ? "text-brand-secondary bg-brand-primary/5"
                                  : "text-gray-700 hover:text-brand-secondary hover:bg-gray-50"
                              )}
                              onClick={() => setOpen(false)}
                            >
                              <span>{link.name}</span>
                            </Link>
                          </div>
                        ))}



                        {/* Research Wing Collapsible Section */}
                        <div className="border-b border-gray-100">
                          <button
                            onClick={() => toggleCategory("researchWing")}
                            className={cn(
                              "flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-colors duration-200",
                              isActive("/published") ||
                                isActive("/ongoing-projects") ||
                                isActive("/international-conferences") ||
                                isActive("/achievements")
                                ? "text-brand-secondary bg-brand-primary/5"
                                : "text-gray-700 hover:text-brand-secondary hover:bg-gray-50"
                            )}
                          >
                            <span>Research Wing</span>
                            {isCategoryExpanded("researchWing") ? (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            )}
                          </button>

                          {isCategoryExpanded("researchWing") && (
                            <div className="bg-gray-50 px-5">
                              {researchWingItems.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className={cn(
                                    "block px-5 py-2 text-sm transition-colors duration-200 border-b border-gray-300 last:border-b-0",
                                    isActive(item.href)
                                      ? "text-brand-secondary font-medium"
                                      : "text-gray-600 hover:text-brand-secondary"
                                  )}
                                  onClick={() => setOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </nav>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500 text-center">
                        © 2024 Research Ustad. All rights reserved.
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
