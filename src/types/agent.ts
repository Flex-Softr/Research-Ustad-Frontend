export interface Agent {
  id: string;
  fullName: string;
  companyName: string;
  phoneNumber: string;
  fullAddress: string;
  email: string;
  password?: string; // Optional as we don't want to expose this in lists
  createdAt?: string;
  updatedAt?: string;
  status?: "active" | "inactive";
  lastLogin?: string;
}

export interface AgentFormData {
  fullName: string;
  companyName: string;
  phoneNumber: string;
  fullAddress: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CreateAgentRequest {
  fullName: string;
  companyName: string;
  phoneNumber: string;
  fullAddress: string;
  email: string;
  password: string;
}
