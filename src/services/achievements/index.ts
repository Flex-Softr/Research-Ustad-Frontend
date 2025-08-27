"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { api } from "@/config";
import { CreateAchievementData, UpdateAchievementData } from "@/type/achievement";

// Public service functions (no authentication required)
export const GetAllAchievementsPublic = async () => {
  try {
    const response = await fetch(`${api.baseUrl}/achievement/public`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["achievement"],
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return null;
  }
};

export const GetAchievementByIdPublic = async (id: string) => {
  try {
    const response = await fetch(`${api.baseUrl}/achievement/public/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["achievement"],
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching achievement:", error);
    return null;
  }
};

// Admin service functions (require authentication)
export const GetAllAchievements = async () => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/achievement`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["achievement"],
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return null;
  }
};

export const GetAchievementById = async (id: string) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/achievement/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["achievement"],
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching achievement:", error);
    return null;
  }
};

export const CreateAchievement = async (achievementData: CreateAchievementData, file: File) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    
    const formData = new FormData();
    
    // Add the achievement data as JSON string
    const dataToSend = {
      title: achievementData.title,
      description: achievementData.description,
    };
    
    formData.append('data', JSON.stringify(dataToSend));
    
    // Add the file (required for creation)
    formData.append('file', file);

    const response = await fetch(`${api.baseUrl}/achievement`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Request failed with status: ${response.status}`);
    }

    revalidateTag("achievement");
    return await response.json();
  } catch (error) {
    console.error("Error creating achievement:", error);
    throw error;
  }
};

export const UpdateAchievement = async (id: string, achievementData: UpdateAchievementData, file?: File) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    
    const formData = new FormData();
    
    // Add the achievement data as JSON string
    const dataToSend = {
      title: achievementData.title,
      description: achievementData.description,
    };
    
    formData.append('data', JSON.stringify(dataToSend));
    
    // Add the file if provided
    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(`${api.baseUrl}/achievement/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Request failed with status: ${response.status}`);
    }

    revalidateTag("achievement");
    return await response.json();
  } catch (error) {
    console.error("Error updating achievement:", error);
    throw error;
  }
};

export const DeleteAchievement = async (id: string) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/achievement/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Request failed with status: ${response.status}`);
    }

    revalidateTag("achievement");
    return await response.json();
  } catch (error) {
    console.error("Error deleting achievement:", error);
    throw error;
  }
};
