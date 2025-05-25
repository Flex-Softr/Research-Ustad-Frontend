"use client";
import { AiOutlineLogin } from "react-icons/ai";

import { DroopDown } from "@/components/ui/core/DropDown/DropDown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getCurrentUser, logout } from "@/services/AuthService";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const navLinks = [
  { name: "Home", href: "/" },
  // {
  //   name: "Our Wings",
  //   subLinks: [
  //     { name: "Publications", href: "/allpapers" },
  //     { name: "Achievements", href: "/achievements" },
  //   ],
  // },
  { name: "Our Researchers", href: "/team-members" },
  { name: "Our Blogs", href: "/blog" },
  { name: "Event", href: "/event" },
  { name: "course", href: "/course" },
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
      className={`sticky top-0 z-50 ${
        scrolling ? "bg-white shadow-md backdrop-blur-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto  hidden lg:flex  justify-between items-center py-4 px-6">
        <Link href="/">
          <h2 className="font-bold text-[22px] flex">
            Research{" "}
            <span className="text-[#bc986b] hover:text-yellow-500">Ustad</span>
          </h2>
        </Link>

        <div className={`md:flex items-center space-x-8`}>
          <div>
            <DroopDown />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger title="User">
              <AiOutlineLogin size={30} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {user && (
                <DropdownMenuItem>
                  {user && (
                    <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                  )}
                </DropdownMenuItem>
              )}
              {user && <DropdownMenuSeparator />}

              {user ? (
                <DropdownMenuItem
                  onClick={handleLogOut}
                  className="bg-red-500 cursor-pointer"
                >
                  {" "}
                  <span>Logout</span>
                </DropdownMenuItem>
              ) : (
                <Link href={"/login"}>
                  <DropdownMenuItem className="bg-red-500 cursor-pointer">
                    Login
                  </DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuContent>
             
          </DropdownMenu>
        </div>
      </div>
      <div>
        <div className="p-4 lg:hidden block bg-white shadow-md">
          <div className="flex justify-between items-center">
            <Link href="/">
              <h2 className="font-bold text-[22px] flex">
                Research{" "}
                <span className="text-[#bc986b] hover:text-yellow-500">
                  Ustad
                </span>
              </h2>
            </Link>
            <div className="flex justify-center items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger title="User">
                  <AiOutlineLogin size={24} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {user && (
                    <DropdownMenuItem>
                      {user && (
                        <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                      )}
                    </DropdownMenuItem>
                  )}
                  {user && <DropdownMenuSeparator />}
                  <DropdownMenuItem className="bg-red-500 cursor-pointer">
                    {user ? (
                      <DropdownMenuItem
                        onClick={handleLogOut}
                        className="bg-red-500 cursor-pointer"
                      >
                        {" "}
                        <span>Logout</span>
                      </DropdownMenuItem>
                    ) : (
                      <Link href={"/login"}>
                        <DropdownMenuItem className="bg-red-500 cursor-pointer">
                          Login
                        </DropdownMenuItem>
                      </Link>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
                 
              </DropdownMenu>
              <div className="flex items-center justify-end gap-4">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger className=" focus:outline-none cursor-pointer">
                    {open ? <X size={24} /> : <Menu size={24} />}
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64 p-4">
                    <nav className="flex flex-col space-y-4">
                      {navLinks.map((link, index) => (
                        <div key={link.name}>
                          {link.subLinks ? (
                            <div>
                              <button
                                className="text-lg font-medium w-full text-left flex justify-between items-center"
                                onClick={() => toggleDropdown(index)}
                              >
                                {link.name}{" "}
                                <ChevronDown
                                  size={20}
                                  className={`transition-transform ${
                                    openDropdown === index ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              {openDropdown === index && (
                                <div className="pl-4 mt-2 space-y-2">
                                  {link.subLinks.map((subLink) => (
                                    <a
                                      key={subLink.name}
                                      href={subLink.href}
                                      className="block"
                                    >
                                      {subLink.name}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <a href={link.href} className="text-lg font-medium">
                              {link.name}
                            </a>
                          )}
                        </div>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
