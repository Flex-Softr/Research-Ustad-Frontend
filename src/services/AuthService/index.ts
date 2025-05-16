"use server";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
export const registerUser = async (data:any) => {
  const token = (await cookies()).get("accessToken")?.value;
      if (!token) {
        throw new Error("Access token not found");
      }
    try {
      const res =  await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/create-ResearchMembars`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json", 
        },       
         body: JSON.stringify(data),
      });
      const result = await res.json();
      return result;
    } catch (error:any) {
      return Error(error);
    }
  };
  

  export async function loginUser(data:FieldValues) {
  console.log(data)
try {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const res = await response.json();
  console.log(res)
  if (res.success) {
          (await cookies()).set("accessToken", res.data.accessToken);
        }
  return { success: !!res.success, message: res.message || "Login failed" };
  revalidateTag:"loginuser"
} catch (error:any) {
  console.log(error)
}
  }
  
  
  
  
  


  
  export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    let decodedData = null;
  
    if (accessToken) {
      decodedData = await jwtDecode(accessToken);
      console.log("decodedata",decodedData)
      return decodedData;
    } else {
      return null;
    }
  };


export const logout = async () => {
  (await cookies()).delete("accessToken");
  revalidateTag("loginuser"); 
};


export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("__next_hmr_refresh_hash__")!.value,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};