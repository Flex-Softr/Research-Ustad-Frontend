import { getCurrentUser } from "@/services/AuthService";
import { NextRequest, NextResponse } from "next/server";
import { JWTPayload } from "@/type";

// Define public routes that do not require authentication
const publicRoutes = [
  "/",
  "/login",
  "/about",
  "/contact",
  "/blog",
  "/events",
  "/courses",
];

// Define protected routes that require authentication
const protectedRoutes = [
  /^\/admin/,
  /^\/user/,
  /^\/dashboard/,
  /^\/profile/,
  /^\/settings/,
];

// Define role-based private routes for different user roles
const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/dashboard/],
  admin: [/^\/admin/, /^\/dashboard/],
  superAdmin: [/^\/admin/, /^\/dashboard/],
};

// Middleware function to handle requests
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // console.log("Middleware executing for pathname:", pathname);

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    // console.log("Public route, allowing access");
    return NextResponse.next();
  }

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    route.test(pathname)
  );

  if (!isProtectedRoute) {
    // console.log("Not a protected route, allowing access");
    return NextResponse.next();
  }

  // console.log("Protected route detected, checking authentication");

  try {
    const userInfo = await getCurrentUser();
    // console.log("User info:", userInfo);

    // If user is not authenticated
    if (!userInfo) {
      console.log("User not authenticated, redirecting to login");
      return NextResponse.redirect(
        new URL(
          `/login?redirectPath=${encodeURIComponent(pathname)}`,
          request.url
        )
      );
    }

    // If user is authenticated, check role-based access
    const userRole = (userInfo as JWTPayload).role;
    // console.log("User role:", userRole);
    // console.log("Available roles:", Object.keys(roleBasedPrivateRoutes));

    if (
      userRole &&
      roleBasedPrivateRoutes[userRole as keyof typeof roleBasedPrivateRoutes]
    ) {
      const allowedRoutes =
        roleBasedPrivateRoutes[userRole as keyof typeof roleBasedPrivateRoutes];
      const hasAccess = allowedRoutes.some((route) => route.test(pathname));

      if (hasAccess) {
        // console.log("User has access to this route");
        return NextResponse.next();
      } else {
        console.log("User role doesn't have access to this specific route");
      }
    } else {
      console.log("User role not found or not authorized:", userRole);
    }

    // User is authenticated but doesn't have permission
    console.log("User authenticated but no permission, redirecting to home");
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Middleware error:", error);
    // On error, redirect to login
    return NextResponse.redirect(
      new URL(
        `/login?redirectPath=${encodeURIComponent(pathname)}`,
        request.url
      )
    );
  }
};

// Configuration for the middleware to specify which routes it should match
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
