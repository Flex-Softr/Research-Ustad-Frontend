"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { api } from "@/config";
import { getResearchMemberEndpoints } from "@/config/apiEndpoints";
import { ApiErrorHandler, handleNetworkError } from "@/utils/apiErrorHandler";

// Get endpoints based on configuration
const ENDPOINTS = getResearchMemberEndpoints();

export const GetAllResearchAssociate = async () => {
  try {
    const response = await fetch(ENDPOINTS.getAll, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["member"],
      },
    });

    return await ApiErrorHandler.handleApiResponse(response, "fetch research associates");
  } catch (error) {
    const apiError = handleNetworkError(error, "fetch research associates");
    console.error("Error fetching research associates:", apiError);
    return { data: [] };
  }
};

export const GetSingleMember = async (id: string) => {
  try {
    const response = await fetch(ENDPOINTS.getSingle(id), {
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
    console.error("Error fetching single member:", error);
    return null;
  }
};

export const GetSinglePersonalMember = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      throw new Error("Access token not found");
    }
    
    const response = await fetch(ENDPOINTS.getPersonal, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) {
      // Throw specific error with status code for better handling
      const errorMessage = `Request failed with status: ${response.status}`;
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching single member:", error);
    throw error; // Re-throw the error instead of returning null
  }
};

export const DeleteMember = async (id: string) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    
    const response = await fetch(ENDPOINTS.delete(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    
    revalidateTag("member");
    return await response.json();
  } catch (error) {
    console.error("Error deleting member:", error);
    return null;
  }
};

export const UpdateMember = async (id: string, data: any) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    
    const response = await fetch(ENDPOINTS.update(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error updating member:", error);
    return null;
  }
};

export const UpdatePersonalMember = async (data: any, file?: File) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    
    let response;
    
    if (file) {
      // If there's a file, use FormData
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('file', file);
      
      response = await fetch(ENDPOINTS.updatePersonal, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
    } else {
      // If no file, send JSON directly
      response = await fetch(ENDPOINTS.updatePersonal, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      });
    }
    
    const result = await response.json();
    
    // Invalidate all relevant caches to ensure updated data is fetched
    revalidateTag("users");
    revalidateTag("loginuser");
    revalidateTag("member");
    revalidateTag("personalInfo");
    
    return result;
  } catch (error) {
    console.error("Error updating member:", error);
    return null;
  }
};

// Legacy function names for backward compatibility
export const GetAllResearchMembers = GetAllResearchAssociate;
export const GetResearchMemberById = GetSingleMember;
export const GetCurrentUserProfile = GetSinglePersonalMember;
