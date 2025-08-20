import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to handle network errors consistently
export function handleNetworkError(error: any): string {
  if (error.name === 'TypeError' && error.message.includes('fetch failed')) {
    return "Unable to connect to server. Please check your connection.";
  }
  if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
    return "Network error. Please check your internet connection.";
  }
  return error.message || "An unexpected error occurred.";
}

