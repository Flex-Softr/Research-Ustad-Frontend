"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { api } from "@/config";

export const GetCurrentSuperAdmin = async () => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/users/superadmin/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["superadmin"],
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching current superAdmin:", error);
    return null;
  }
};

export const ReplaceSuperAdmin = async (newSuperAdminId: string) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/users/superadmin/replace`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ newSuperAdminId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Request failed with status: ${response.status}`);
    }

    revalidateTag("superadmin");
    revalidateTag("users");
    return await response.json();
  } catch (error) {
    console.error("Error replacing superAdmin:", error);
    throw error;
  }
};
