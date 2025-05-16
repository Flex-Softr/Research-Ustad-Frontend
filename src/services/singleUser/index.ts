"use server"

import { cookies } from "next/headers";

  export const GetMe = async () => {
    try {
      const token = (await cookies()).get("accessToken")?.value;
  
      if (!token) {
        throw new Error("Access token not found");
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
        },
        next:{
        tags:['loginuser']
        }
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };