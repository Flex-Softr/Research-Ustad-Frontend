"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { api } from "@/config";

// create user
export const createUser = async (data: any, file?: File) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    
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
          "Content-Type": "application/json",
          Authorization: token,
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
};

export const GetAllUsers = async () => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
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
    console.error("Error fetching All users:", error);
    return null;
  }
};

export const PromoteRole = async (id: string) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/users/userToadmin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    revalidateTag("users");
    return await response.json();
  } catch (error) {
    console.error("Error changing role:", error);
    return null;
  }
};

export const DeleteUser = async (id: string) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    revalidateTag("users");
    return await response.json();
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};