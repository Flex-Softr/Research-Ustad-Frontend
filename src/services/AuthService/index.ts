"use server";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { api } from "@/config";
import { createUser } from "../Users";

// ===== AUTHENTICATION FUNCTIONS =====

export const registerUser = async (data: any) => {
  try {
    const result = await createUser(data);
    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export async function loginUser(data: FieldValues) {
  console.log(data);

  try {
    const response = await fetch(`${api.baseUrl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    console.log(res);

    if (res.success) {
      (await cookies()).set("accessToken", res.data.accessToken);
      revalidateTag("loginuser");
      return { success: true, message: res.message || "Login successful" };
    } else {
      return { success: false, message: res.message || "Login failed" };
    }
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, message: "Network error. Please try again." };
  }
}

export const getCurrentUser = async () => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    // Decode the JWT token
    const decodedData = await jwtDecode(accessToken);
    console.log("decodedata", decodedData);

    // Check if token has required fields
    if (!decodedData || typeof decodedData !== "object") {
      return null;
    }

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedData.exp && decodedData.exp < currentTime) {
      console.log("Token expired");
      // Remove expired token
      (await cookies()).delete("accessToken");
      return null;
    }

    return decodedData;
  } catch (error) {
    console.error("Error decoding token:", error);
    // Remove invalid token
    try {
      (await cookies()).delete("accessToken");
    } catch (e) {
      console.error("Error removing invalid token:", e);
    }
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
  revalidateTag("loginuser");
};

export const getNewToken = async () => {
  try {
    const res = await fetch(`${api.baseUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("__next_hmr_refresh_hash__")!
          .value,
      },
    });

    return res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
