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
// export async function getPublicUsers(): Promise<any> {
//   try {
//     const token = await getToken();
    
//     const response = await fetch(`${api.baseUrl}/users/all-users`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       next: {
//         tags: ["users"],
//       },
//     });

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching public users:", error);
//     return null;
//   }
// }
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

export const registerUser = async (data: any) => await createUser(data);
export const GetMe = async () => await getCurrentUser();
export const GetAllUsers = async () => await getAllUsers();
export const GetAllResearchAssociate = async () => await getResearchMembers();
export const GetSingleMember = async (id: string) => await getResearchMember(id);
export const GetSinglePersonalMember = async () => await getCurrentResearchMember();
export const DeleteMember = async (id: string) => await deleteResearchMember(id);