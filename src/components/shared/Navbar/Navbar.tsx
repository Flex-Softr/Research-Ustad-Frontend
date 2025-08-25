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
import { Menu, X, LogIn, User } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDashboardUrl } from "@/lib/dashboardUtils";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Researchers", href: "/team-members" },
  { name: "Our Blogs", href: "/blog" },
  { name: "Event", href: "/event" },
  { name: "Course", href: "/course" },
  { name: "Contact Us", href: "/contact" },
];

interface NavItem {
  label: string;
  href?: string;
  subDropdown?: NavItem[];
}

const links: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Team Members", href: "/team-members" },
  { label: "News & Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
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
  const [openDropdown, setOpenDropdown] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  
  const toggleDropdown = (index: any) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
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
        <Image src="/logo.png" alt="logo" width={1000} height={100} className="w-20 h-20" />
          <h2 className="font-bold text-[22px] flex items-center transition-colors text-brand-primary group-hover:text-brand-secondary duration-300">
            Research{" "}
            <span className="group-hover:text-brand-primary text-brand-secondary transition-colors duration-300">
              Ustad
            </span>
          </h2>
        </Link>

        <div className="flex items-center space-x-8">
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
                <SheetContent
                  side="left"
                  className="w-64 p-4 bg-white/95 backdrop-blur-md"
                >
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                  <nav className="flex flex-col space-y-4 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                          "text-lg font-medium transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-50",
                          isActive(link.href)
                            ? "text-brand-secondary font-semibold bg-brand-primary/5"
                            : "text-gray-700 hover:text-brand-secondary"
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
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
