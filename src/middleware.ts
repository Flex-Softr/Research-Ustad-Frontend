import { getCurrentUser } from "@/services/AuthService";
import { NextRequest, NextResponse } from "next/server";

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/about",
  "/contact",
  "/blog",
  "/events",
  "/courses",
  "/test-auth",
  "/api",
];

// Protected routes that require authentication
const protectedRoutes = [
  "/admin",
  "/user",
  "/dashboard",
  "/profile",
  "/settings",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if it's a protected route
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  try {
    const user = await getCurrentUser();

    if (!user) {
      // Redirect to login with the original path
      return NextResponse.redirect(
        new URL(
          `/login?redirectPath=${encodeURIComponent(pathname)}`,
          request.url
        )
      );
    }

    // User is authenticated, allow access
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(
      new URL(
        `/login?redirectPath=${encodeURIComponent(pathname)}`,
        request.url
      )
    );
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
