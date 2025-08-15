import { getCurrentUser } from "@/services/AuthService";

export interface Client {
  _id: string;
  fullName: string;
  nid: string;
  phoneNumber: string;
  district: string;
  fullAddress: string;
  photo: string;
  createdAt: string;
}

export interface CreateClientData {
  fullName: string;
  nid: string;
  phoneNumber: string;
  district: string;
  fullAddress: string;
  photo: File | null;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Get all clients
export const getAllClients = async (): Promise<{
  success: boolean;
  data?: Client[];
  message?: string;
}> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/clients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch clients");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error fetching clients:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch clients",
    };
  }
};

// Create a new client
export const createClient = async (
  clientData: CreateClientData
): Promise<{ success: boolean; data?: Client; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const formData = new FormData();
    formData.append("fullName", clientData.fullName);
    formData.append("nid", clientData.nid);
    formData.append("phoneNumber", clientData.phoneNumber);
    formData.append("district", clientData.district);
    formData.append("fullAddress", clientData.fullAddress);

    if (clientData.photo) {
      formData.append("photo", clientData.photo);
    }

    const response = await fetch(`${API_BASE_URL}/clients`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create client");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error creating client:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create client",
    };
  }
};

// Search clients by NID
export const searchClientsByNid = async (
  nid: string
): Promise<{ success: boolean; data?: Client[]; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(
      `${API_BASE_URL}/clients/search?nid=${encodeURIComponent(nid)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to search clients");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error searching clients:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to search clients",
    };
  }
};

// Delete a client
export const deleteClient = async (
  clientId: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/clients/${clientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete client");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting client:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete client",
    };
  }
};
