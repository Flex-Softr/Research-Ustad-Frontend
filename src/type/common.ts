// Common Types
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
  current?: boolean;
}

export interface TeamMember extends UserProfile {
  // Extends UserProfile from user.ts
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationResponse<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
  title: string;
  itemName: string | null;
  itemType?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

// Filter types
export interface BaseFilter {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  error: {
    code: string;
    details?: any;
  };
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'file';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Import UserProfile for TeamMember
import type { UserProfile } from './user'; 