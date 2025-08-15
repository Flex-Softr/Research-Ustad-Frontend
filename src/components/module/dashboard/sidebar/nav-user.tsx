"use client";

import { ChevronsUpDown, LogOut, User, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { logout, getCurrentUser } from "@/services/AuthService";
import { useEffect, useState } from "react";
import { JWTPayload } from "@/type";

interface User {
  _id: string;
  email: string;
  role: string;
  name?: string;
}

export function NavUser() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const isCollapsed = false; // Always expanded for simplicity

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const jwtUser = await getCurrentUser();
        if (jwtUser) {
          const jwtPayload = jwtUser as any; // Cast to any to access custom properties
          setUser({
            _id: jwtPayload.sub || "",
            email: jwtPayload.email || "",
            role: jwtPayload.role || "user",
            name: jwtPayload.name || "",
          });
        }
      } catch (error) {
        console.error("Error getting JWT user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getUserInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  const userButton = (
    <button
      className={`flex items-center ${
        isCollapsed ? "justify-center" : "space-x-3"
      } w-full px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors`}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage
          src="/api/placeholder/32/32"
          alt={user?.name || user?.email}
        />
        <AvatarFallback className="bg-purple-100 text-purple-600 text-xs font-medium">
          {getUserInitials(user?.name, user?.email)}
        </AvatarFallback>
      </Avatar>
      {!isCollapsed && (
        <>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || user?.email || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate capitalize">
              {user?.role || "User"}
            </p>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-gray-400" />
        </>
      )}
    </button>
  );

  return (
    <div className="px-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{userButton}</DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56 rounded-lg shadow-lg border border-gray-200"
          align="end"
          sideOffset={8}
        >
          <DropdownMenuLabel className="p-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="/api/placeholder/40/40"
                  alt={user?.name || user?.email}
                />
                <AvatarFallback className="bg-purple-100 text-purple-600">
                  {getUserInitials(user?.name, user?.email)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || user?.email || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="px-3 py-2 text-sm">
            <User className="h-4 w-4 mr-3 text-gray-400" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem className="px-3 py-2 text-sm">
            <Settings className="h-4 w-4 mr-3 text-gray-400" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
