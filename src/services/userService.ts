"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { api } from "@/config";

// ===== CONSOLIDATED USER SERVICE =====

/**
 * Get authentication token
 */
async function getToken(): Promise<string> {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) {
    throw new Error("Access token not found");
  }
  return token;
}

// ===== USER CREATION =====

/**
 * Create a new user (supports both regular users and research members)
 */
export async function createUser(data: any, file?: File): Promise<any> {
  try {
    const token = await getToken();
    
    let response;
    
    if (file) {
      // Create with file upload
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('file', file);
      
      response = await fetch(`${api.baseUrl}/users/create`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
    } else {
      // Create with JSON data only
      response = await fetch(`${api.baseUrl}/users/create-json`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    const result = await response.json();
    
    if (result.success) {
      revalidateTag("users");
      revalidateTag("member");
    }
    
    return result;
  } catch (error: any) {
    console.error("Error creating user:", error);
    return { success: false, message: error.message };
  }
}

// ===== USER RETRIEVAL =====

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<any> {
  try {
    const token = await getToken();
    
    const response = await fetch(`${api.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["loginuser"],
      },
    });

    if (!response.ok) {
      const errorMessage = `Request failed with status: ${response.status}`;
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<any> {
  try {
    const token = await getToken();
    
    const response = await fetch(`${api.baseUrl}/users/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["users"],
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching all users:", error);
    return null;
  }
}

/**
 * Get all users (public - limited fields)
 */
export async function getPublicUsers(): Promise<any> {
  try {
    const token = await getToken();
    
    const response = await fetch(`${api.baseUrl}/users/all-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["users"],
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching public users:", error);
    return null;
  }
}

/**
 * Search users by name
 */
export async function searchUsers(query: string): Promise<any> {
  try {
    const token = await getToken();
    
    const response = await fetch(`${api.baseUrl}/users/search?query=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error searching users:", error);
    return { data: [] };
  }
}

// ===== RESEARCH MEMBER SPECIFIC =====

/**
 * Get all research members (public)
 */
export async function getResearchMembers(): Promise<any> {
  try {
    const response = await fetch(`${api.baseUrl}/users/research-members`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["member"],
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching research members:", error);
    return { data: [] };
  }
}

/**
 * Get single research member by ID
 */
export async function getResearchMember(id: string): Promise<any> {
  try {
    const response = await fetch(`${api.baseUrl}/users/research-members/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching research member:", error);
    return null;
  }
}

/**
 * Get current user as research member
 */
export async function getCurrentResearchMember(): Promise<any> {
  try {
    const token = await getToken();
    
    const response = await fetch(`${api.baseUrl}/users/research-members/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) {
      const errorMessage = `Request failed with status: ${response.status}`;
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching current research member:", error);
    throw error;
  }
}

// ===== USER UPDATES =====

/**
 * Update user by ID
 */
export async function updateUser(id: string, data: any, file?: File): Promise<any> {
  try {
    const token = await getToken();
    
    let response;
    
    if (file) {
      // Update with file upload
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('file', file);
      
      response = await fetch(`${api.baseUrl}/users/research-members/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
    } else {
      // Update with JSON data only
      response = await fetch(`${api.baseUrl}/users/research-members/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    
    const result = await response.json();
    
    if (result.success) {
      revalidateTag("users");
      revalidateTag("member");
    }
    
    return result;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}

/**
 * Update current user profile
 */
export async function updateCurrentUser(data: any, file?: File): Promise<any> {
  try {
    const token = await getToken();
    
    let response;
    
    if (file) {
      // Update with file upload
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('file', file);
      
      response = await fetch(`${api.baseUrl}/users/research-members/me`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
    } else {
      // Update with JSON data only
      response = await fetch(`${api.baseUrl}/users/research-members/me`, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    
    const result = await response.json();
    
    if (result.success) {
      revalidateTag("users");
      revalidateTag("member");
      revalidateTag("loginuser");
    }
    
    return result;
  } catch (error) {
    console.error("Error updating current user:", error);
    return null;
  }
}

// ===== USER MANAGEMENT =====

/**
 * Toggle user role between admin and user
 */
export async function toggleUserRole(id: string): Promise<any> {
  try {
    const token = await getToken();
    
    const response = await fetch(`${api.baseUrl}/users/toggle-role/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    
    const result = await response.json();
    
    if (result.success) {
      revalidateTag("users");
    }
    
    return result;
  } catch (error) {
    console.error("Error toggling user role:", error);
    return null;
  }
}

/**
 * Delete user
 */
export async function deleteUser(id: string): Promise<any> {
  try {
    const token = await getToken();
    
    const response = await fetch(`${api.baseUrl}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    
    const result = await response.json();
    
    if (result.success) {
      revalidateTag("users");
      revalidateTag("member");
    }
    
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
}

/**
 * Delete research member
 */
export async function deleteResearchMember(id: string): Promise<any> {
  try {
    const token = await getToken();
    
    const response = await fetch(`${api.baseUrl}/users/research-members/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    
    const result = await response.json();
    
    if (result.success) {
      revalidateTag("users");
      revalidateTag("member");
    }
    
    return result;
  } catch (error) {
    console.error("Error deleting research member:", error);
    return null;
  }
}

// ===== STATISTICS =====

/**
 * Get platform statistics (admin only)
 */
export async function getPlatformStats(): Promise<any> {
  try {
    const token = await getToken();
    
    const response = await fetch(`${api.baseUrl}/users/stats/platform`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["personalInfo"],
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching platform stats:", error);
    return null;
  }
}

/**
 * Get personal statistics
 */
export async function getPersonalStats(): Promise<any> {
  try {
    const token = await getToken();
    
    const response = await fetch(`${api.baseUrl}/users/stats/personal`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["personalInfo"],
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching personal stats:", error);
    return null;
  }
}

// ===== SUPERADMIN MANAGEMENT =====

/**
 * Get current superAdmin information
 */
export async function getCurrentSuperAdmin(): Promise<any> {
  try {
    const token = await getToken();
    
    const response = await fetch(`${api.baseUrl}/users/superadmin/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching current superAdmin:", error);
    return null;
  }
}

/**
 * Replace current superAdmin
 */
export async function replaceSuperAdmin(newSuperAdminId: string): Promise<any> {
  try {
    const token = await getToken();
    
    const response = await fetch(`${api.baseUrl}/users/superadmin/replace`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ newSuperAdminId }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      revalidateTag("users");
    }
    
    return result;
  } catch (error) {
    console.error("Error replacing superAdmin:", error);
    return null;
  }
}

// ===== LEGACY EXPORTS FOR BACKWARD COMPATIBILITY =====

// Export individual functions for backward compatibility
export const registerUser = async (data: any) => await createUser(data);
export const GetMe = async () => await getCurrentUser();
export const GetAllUsers = async () => await getAllUsers();
export const GetAllResearchAssociate = async () => await getResearchMembers();
export const GetSingleMember = async (id: string) => await getResearchMember(id);
export const GetSinglePersonalMember = async () => await getCurrentResearchMember();
export const DeleteMember = async (id: string) => await deleteResearchMember(id);
export const UpdateMember = async (id: string, data: any) => await updateUser(id, data);
export const UpdatePersonalMember = async (data: any, file?: File) => await updateCurrentUser(data, file);
export const PromoteRole = async (id: string) => await toggleUserRole(id);
export const GetAllPersonalInfo = async () => await getPersonalStats();
export const GetAllInfoAdmin = async () => await getPlatformStats();
