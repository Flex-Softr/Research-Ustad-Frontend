"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { api } from "@/config";

export const GetAllResearchAssociate = async () => {
  try {
    const response = await fetch(`${api.baseUrl}/researchAssociate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["member"],
      },
    });

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return { data: [] };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching research associates:", error);
    return { data: [] };
  }
};
export const GetSingleMember = async (id: string) => {
  try {
    const response = await fetch(
      `${api.baseUrl}/researchAssociate/singleGe/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
    const response = await fetch(`${api.baseUrl}/researchAssociate/singleGet`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
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

export const DeleteMember = async (id: string) => {
  console.log(id);
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/researchAssociate/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    revalidateTag("member");
    return await response.json();
  } catch (error) {
    console.error("Error delete memeber:", error);
    return null;
  }
};
export const UpdateMember = async (id: string, data: any) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/researchAssociate/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: data,
    });
    return await response.json();
  } catch (error) {
    console.error("Error delete memeber:", error);
    return null;
  }
};
export const UpdatePersonalMember = async (data: any) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    console.log(token);
    const response = await fetch(
      `${api.baseUrl}/researchAssociate/MembarUpdate`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: data,
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error delete memeber:", error);
    return null;
  }
};
