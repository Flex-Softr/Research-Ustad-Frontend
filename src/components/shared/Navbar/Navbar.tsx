"use client";
import { AiOutlineLogin } from "react-icons/ai";

import { DroopDown } from "@/components/ui/core/DropDown/DropDown";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getCurrentUser, logout } from "@/services/AuthService";
import { ChevronDown, Menu, X, LogIn, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  role: "user" | "admin" | "supperAdmin";
  iat: number;
  exp: number;
};
const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserToken | null>(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const router = useRouter();
  const toggleDropdown = (index: any) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  useEffect(() => {
    const fetchData = async () => {
      const user = await getCurrentUser();
      setUser(user); // Store the user data
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
      <div className="max-w-7xl mx-auto hidden lg:flex justify-between items-center py-4 px-6">
        <Link href="/" className="group">
          <h2 className="font-bold text-[22px] flex items-center transition-colors duration-300">
            Research{" "}
            <span className="text-brand-primary group-hover:text-brand-secondary transition-colors duration-300">
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
                  variant="outline"
                  className="relative group border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-6 py-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-brand-primary/25 focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 overflow-hidden"
                  style={{
                    borderRadius: "0 1rem 0 1rem",
                  }}
                >
                  <span className="flex items-center relative z-10">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </span>
                  <div className="absolute top-0 right-0 w-4 h-4 bg-brand-primary/20 rounded-bl-full"></div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mt-2">
                <DropdownMenuItem className="cursor-pointer">
                  <Link
                    href={`/admin/dashboard`}
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
                className="relative group bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white px-6 py-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-brand-primary/30 border-0 focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 overflow-hidden"
                style={{
                  borderRadius: "1rem 0 1rem 0",
                }}
              >
                <span className="flex items-center relative z-10">
                  <LogIn className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Login
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 right-0 w-4 h-4 bg-white/20 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-brand-secondary/30 rounded-tr-full"></div>
              </Button>
            </Link>
          )}
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="lg:hidden block">
        <div className="p-4 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100">
          <div className="flex justify-between items-center">
            <Link href="/" className="group">
              <h2 className="font-bold text-[20px] flex items-center transition-colors duration-300">
                Research{" "}
                <span className="text-brand-primary group-hover:text-brand-secondary transition-colors duration-300">
                  Ustad
                </span>
              </h2>
            </Link>
            <div className="flex items-center gap-3">
              {/* Mobile Login Button */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="relative group border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-4 py-1 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-brand-primary/25 focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 overflow-hidden"
                      style={{
                        borderRadius: "0 0.75rem 0 0.75rem",
                      }}
                    >
                      <span className="flex items-center relative z-10">
                        <User className="w-3 h-3 mr-1" />
                        <span className="text-sm">Dashboard</span>
                      </span>
                      <div className="absolute top-0 right-0 w-3 h-3 bg-brand-primary/20 rounded-bl-full"></div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 mt-2">
                    <DropdownMenuItem className="cursor-pointer">
                      <Link
                        href={`/${user?.role}/dashboard`}
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
                    size="sm"
                    className="relative group bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white px-4 py-1 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-brand-primary/30 border-0 focus:outline-none focus:ring-2 focus:ring-brand-secondary/40 overflow-hidden"
                    style={{
                      borderRadius: "0.75rem 0 0.75rem 0",
                    }}
                  >
                    <span className="flex items-center relative z-10">
                      <LogIn className="w-3 h-3 mr-1 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-sm">Login</span>
                    </span>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-white/20 rounded-bl-full"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-brand-secondary/30 rounded-tr-full"></div>
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
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-lg font-medium text-gray-700 hover:text-brand-primary transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-50"
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
