"use server"


import { cookies } from "next/headers";
 export const GetAllPersonalInfo = async () => {
    try {
      const cookieStore = await cookies();
      let token = cookieStore.get("accessToken")!.value;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/personalinfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
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
      console.error("Error fetching research associates:", error);
      return null;
    }
  };

  export const GetAllInfoAdmin = async () => {
    try {
      const cookieStore = await cookies();
      let token = cookieStore.get("accessToken")!.value;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/userinfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
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
      console.error("Error fetching research associates:", error);
      return null;
    }
  };