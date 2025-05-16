"use server"

import { ResearchPaperForm } from "@/components/module/userRoutes/AddResearchpaper/AddResearchPaper";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

  export const GetAllResearchPaper = async () => {
    try {
      const cookieStore = await cookies();
      let token = cookieStore.get("accessToken")!.value;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/paper/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/paper/personalPaper`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
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
  export const GetResearchPaperById = async (id:string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/paper/personalPapers/${id}`, {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/paper/personalPaper`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/course`, {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/paper/public`, {
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
  
  export const ApprovePaper = async (id:string) => {
  console.log(id)
    try {
      const cookieStore = await cookies();
      
      let token = cookieStore.get("accessToken")!.value;
      console.log("idddddddddd", id);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/paper/approve/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
        },
      });
      revalidateTag("paper");
      return await response.json();
    } catch (error) {
      console.error("Error Aprove researchPaper:", error);
      return null;
    }
  };
  export const DeletePaper = async (id:string) => {
  console.log(id)
    try {
      const cookieStore = await cookies();
      let token = cookieStore.get("accessToken")!.value;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/paper/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization":token,
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/paper/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
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