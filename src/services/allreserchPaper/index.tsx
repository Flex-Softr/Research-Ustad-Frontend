"use server";

import { ResearchPaperForm } from "@/components/module/userRoutes/AddResearchpaper/AddResearchPaper";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { api } from "@/config";

export const GetAllResearchPaper = async () => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/paper/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["paper"],
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
export const GetAllResearchPaperMy = async () => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/paper/personalPaper`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["paper"],
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
export const GetResearchPaperById = async (id: string) => {
  try {
    const response = await fetch(`${api.baseUrl}/paper/personalPapers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["singlePaper"],
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching research paper:", error);
    return null;
  }
};
export const MyResearchPaper = async () => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/paper/personalPaper`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["paper"],
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
export const MyCourse = async () => {
  try {
    const response = await fetch(`${api.baseUrl}/course`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
export const GetAllResearchPaperPublic = async () => {
  try {
    const response = await fetch(`${api.baseUrl}/paper/public`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export const ApprovePaper = async (id: string) => {
  console.log(id);
  try {
    const cookieStore = await cookies();

    let token = cookieStore.get("accessToken")!.value;
    console.log("idddddddddd", id);
    const response = await fetch(`${api.baseUrl}/paper/approve/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    revalidateTag("paper");
    return await response.json();
  } catch (error) {
    console.error("Error Aprove researchPaper:", error);
    return null;
  }
};
export const DeletePaper = async (id: string) => {
  console.log(id);
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/paper/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    revalidateTag("paper");
    return await response.json();
  } catch (error) {
    console.error("Error Aprove researchPaper:", error);
    return null;
  }
};

export const PostResearchPaper = async (formData: ResearchPaperForm) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/paper/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(formData),
    });

    // if (!response.ok) {
    //   throw new Error(`Request failed with status: ${response.status}`);
    // }

    return await response.json();
  } catch (error) {
    console.error("Error posting research paper:", error);
    throw error; // Re-throwing the error to be handled in the component
  }
};

export const SearchUsers = async (query: string) => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/users/search?query=${encodeURIComponent(query)}`, {
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
    console.error("Error searching users:", error);
    return { data: [] };
  }
};

export const GetAllUsers = async () => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;
    const response = await fetch(`${api.baseUrl}/users/all-users`, {
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
    console.error("Error fetching all users:", error);
    return { data: [] };
  }
};
