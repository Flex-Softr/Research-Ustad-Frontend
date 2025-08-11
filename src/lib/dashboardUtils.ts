/**
 * Utility function to get the correct dashboard URL based on user role
 * @param role - The user's role (user, admin, superAdmin)
 * @returns The appropriate dashboard URL
 */
export const getDashboardUrl = (role: string): string => {
  switch (role) {
    case "superAdmin":
    case "admin":
      return "/admin/dashboard";
    case "user":
      return "/user/dashboard";
    default:
      return "/user/dashboard";
  }
};

/**
 * Utility function to check if a user has admin privileges
 * @param role - The user's role
 * @returns True if the user has admin privileges
 */
export const hasAdminPrivileges = (role: string): boolean => {
  return role === "admin" || role === "superAdmin";
};

/**
 * Utility function to get the appropriate route configuration based on user role
 * @param role - The user's role
 * @returns 'admin' for admin/superAdmin users, 'user' for regular users
 */
export const getRouteType = (role: string): 'admin' | 'user' => {
  return hasAdminPrivileges(role) ? 'admin' : 'user';
};

