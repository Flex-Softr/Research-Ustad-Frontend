import { getCurrentUser } from "@/services/AuthService";

export interface ClientRecord {
  _id: string;
  clientId: string;
  disDate: string;
  amount: string;
  age: string;
  endingDate: string;
  bod: string;
  eod: string;
  note: string;
  noteStatus: "pending" | "completed" | "cancelled";
  scheme: string;
  company: string;
  createdAt: string;
}

export interface CreateClientRecordData {
  clientId: string;
  disDate: string;
  amount: string;
  age: string;
  endingDate: string;
  bod: string;
  eod: string;
  note: string;
  noteStatus: "pending" | "completed" | "cancelled";
  scheme: string;
  company: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Get all records for a specific client
export const getClientRecords = async (
  clientId: string
): Promise<{ success: boolean; data?: ClientRecord[]; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/client/nid/${clientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch client records");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error fetching client records:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch client records",
    };
  }
};

// Create a new client record
export const createClientRecord = async (
  recordData: CreateClientRecordData
): Promise<{ success: boolean; data?: ClientRecord; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/client-records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(recordData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create client record");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error creating client record:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create client record",
    };
  }
};

// Delete a client record
export const deleteClientRecord = async (
  recordId: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/client-records/${recordId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete client record");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting client record:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete client record",
    };
  }
};

// Get all companies
export const getAllCompanies = async (): Promise<{
  success: boolean;
  data?: { _id: string; name: string }[];
  message?: string;
}> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/companies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch companies");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error fetching companies:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch companies",
    };
  }
};
