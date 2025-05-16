"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
export const createEvents = async (data:any) => {
  const token = (await cookies()).get("accessToken")?.value;
  
      if (!token) {
        throw new Error("Access token not found");
      }
  console.log(data)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/event`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: data,
      });
      const result = await res.json();
      return result;
    } catch (error:any) {
      return Error(error);
    }
  };