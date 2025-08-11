"use server";

import { cookies } from "next/headers";
import { api } from "@/config";

export const GetMe = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
      throw new Error("Access token not found");
    }
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
      // Throw specific error with status code for better handling
      const errorMessage = `Request failed with status: ${response.status}`;
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Re-throw the error instead of returning null
  }
};
