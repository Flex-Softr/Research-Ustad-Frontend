// Client-side token utilities
export const getClientToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const setClientToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const removeClientToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};
