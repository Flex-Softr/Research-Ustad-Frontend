"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { api } from "@/config";
import { CreateInternationalConferenceData, UpdateInternationalConferenceData } from "@/type/internationalConference";

export const GetAllInternationalConferencesPublic = async () => {
  try {
    const response = await fetch(`${api.baseUrl}/international-conference/public`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching international conferences:", error);
    throw new Error("Failed to fetch international conferences");
  }
};

export const GetInternationalConferenceByIdPublic = async (id: string) => {
  try {
    const response = await fetch(`${api.baseUrl}/international-conference/public/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching international conference:", error);
    throw new Error("Failed to fetch international conference");
  }
};

export const GetAllInternationalConferences = async () => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;

    const response = await fetch(`${api.baseUrl}/international-conference`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching international conferences:", error);
    throw new Error("Failed to fetch international conferences");
  }
};

export const GetInternationalConferenceById = async (id: string) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;

    const response = await fetch(`${api.baseUrl}/international-conference/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching international conference:", error);
    throw new Error("Failed to fetch international conference");
  }
};

export const CreateInternationalConference = async (
  internationalConferenceData: CreateInternationalConferenceData,
  file: File
) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;

    const formData = new FormData();
    formData.append('data', JSON.stringify({
      title: internationalConferenceData.title,
      description: internationalConferenceData.description,
    }));
    formData.append('file', file);

    const response = await fetch(`${api.baseUrl}/international-conference`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create international conference");
    }

    revalidateTag("international-conferences");
    return data;
  } catch (error) {
    console.error("Error creating international conference:", error);
    throw error;
  }
};

export const UpdateInternationalConference = async (
  id: string,
  internationalConferenceData: UpdateInternationalConferenceData,
  file?: File
) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;

    const formData = new FormData();
    formData.append('data', JSON.stringify({
      title: internationalConferenceData.title,
      description: internationalConferenceData.description,
    }));
    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(`${api.baseUrl}/international-conference/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update international conference");
    }

    revalidateTag("international-conferences");
    return data;
  } catch (error) {
    console.error("Error updating international conference:", error);
    throw error;
  }
};

export const DeleteInternationalConference = async (id: string) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;

    const response = await fetch(`${api.baseUrl}/international-conference/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete international conference");
    }

    revalidateTag("international-conferences");
    return data;
  } catch (error) {
    console.error("Error deleting international conference:", error);
    throw error;
  }
};
