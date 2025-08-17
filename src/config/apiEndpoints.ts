import { api } from "./index";

// API Endpoint Configuration
export const API_ENDPOINTS = {
  // New consolidated endpoints
  NEW: {
    researchMembers: {
      getAll: `${api.baseUrl}/users/research-members`,
      getSingle: (id: string) => `${api.baseUrl}/users/research-members/${id}`,
      getPersonal: `${api.baseUrl}/users/research-members/me`,
      update: (id: string) => `${api.baseUrl}/users/research-members/${id}`,
      updatePersonal: `${api.baseUrl}/users/research-members/me`,
      delete: (id: string) => `${api.baseUrl}/users/research-members/${id}`,
    },
    users: {
      me: `${api.baseUrl}/users/me`,
      all: `${api.baseUrl}/users/all`,
      userInfo: `${api.baseUrl}/users/userinfo`,
      personalInfo: `${api.baseUrl}/users/personalinfo`,
      search: `${api.baseUrl}/users/search`,
      allUsers: `${api.baseUrl}/users/all-users`,
      createResearchMember: `${api.baseUrl}/users/create-ResearchMembar`,
      createResearchMembers: `${api.baseUrl}/users/create-ResearchMembars`,
      userToAdmin: (id: string) => `${api.baseUrl}/users/userToadmin/${id}`,
      delete: (id: string) => `${api.baseUrl}/users/${id}`,
    },
  },
  
  // Legacy endpoints (for backward compatibility)
  LEGACY: {
    researchMembers: {
      getAll: `${api.baseUrl}/researchAssociate`,
      getSingle: (id: string) => `${api.baseUrl}/researchAssociate/singleGe/${id}`,
      getPersonal: `${api.baseUrl}/researchAssociate/singleGet`,
      update: (id: string) => `${api.baseUrl}/researchAssociate/${id}`,
      updatePersonal: `${api.baseUrl}/researchAssociate/MembarUpdate`,
      delete: (id: string) => `${api.baseUrl}/researchAssociate/${id}`,
    },
    users: {
      me: `${api.baseUrl}/users/me`,
      all: `${api.baseUrl}/users/all`,
      userInfo: `${api.baseUrl}/users/userinfo`,
      personalInfo: `${api.baseUrl}/users/personalinfo`,
      search: `${api.baseUrl}/users/search`,
      allUsers: `${api.baseUrl}/users/all-users`,
      createResearchMember: `${api.baseUrl}/users/create-ResearchMembar`,
      createResearchMembers: `${api.baseUrl}/users/create-ResearchMembars`,
      userToAdmin: (id: string) => `${api.baseUrl}/users/userToadmin/${id}`,
      delete: (id: string) => `${api.baseUrl}/users/${id}`,
    },
  },
};

// Configuration to switch between new and legacy endpoints
export const API_CONFIG = {
  useNewEndpoints: true, // Use new consolidated endpoints
  fallbackToLegacy: false, // No fallback needed
};

// Get the appropriate endpoints based on configuration
export const getEndpoints = () => {
  return API_CONFIG.useNewEndpoints ? API_ENDPOINTS.NEW : API_ENDPOINTS.LEGACY;
};

// Helper function to get research member endpoints
export const getResearchMemberEndpoints = () => {
  return getEndpoints().researchMembers;
};

// Helper function to get user endpoints
export const getUserEndpoints = () => {
  return getEndpoints().users;
};
