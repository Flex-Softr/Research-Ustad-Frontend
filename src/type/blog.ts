// Blog Types
export interface Blog {
  _id?: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  author: {
    fullName: string;
    email: string;
    image?: string;
    designation?: string;
  };
  publishedDate?: string;
  createdAt?: string;
  updatedAt?: string;
  status: "pending" | "approved" | "rejected";
  views?: number;
  likes?: number;
}

export interface BlogTableRowProps {
  blog: Blog;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onView: (blog: Blog) => void;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
  onApprove?: (blog: Blog) => void;
  onReject?: (blog: Blog) => void;
  formatDate: (dateString: string) => string;
  isAdmin?: boolean;
}

export interface BlogPostForm {
  title: string;
  imageUrl?: string;
  category: string;
  content: string;
  status?: "pending" | "approved" | "rejected";
}

export interface BlogSubmissionData {
  title: string;
  category: string;
  content: string;
  imageUrl?: string;
  status?: "pending" | "approved" | "rejected";
}

export interface BlogCategory {
  value: string;
  label: string;
}

export interface IPost {
  _id?: string;
  imageUrl: string;
  title: string;
  author?: Authors;
  category?: string;
  status?: "pending" | "approved" | "rejected";
}

export interface TPost {
  _id: string;
  title: string;
  author: Author;
  imageUrl: string;
  content: string;
  category: string;
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
  status: "pending" | "approved" | "rejected";
  __v: number;
}

interface Author {
  _id: string;
  email: string;
  image: string;
  needsPasswordChange: boolean;
  fullName: string;
  designation: string;
  status: string;
  role: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Authors {
  _id: string;
  name: string;
  designation: string;
  image: string;
  email?: string;
  fullName?: string;
  role: string;
} 