// Main Type Exports
// This file serves as the central export point for all types

// User Types
export * from './user';

// Blog Types
export * from './blog';

// Event Types
export * from './event';

// Course Types
export * from './course';

// Research Types
export * from './research';

// Common Types
export * from './common';

// Legacy exports for backward compatibility
// These are kept to maintain existing imports

export type TResearchAssociate = {
  image: string;
  current: {
    institution: string;
    department: string;
    degree: string;
  };
  education: {
    degree: string;
    field: string;
    institution: string;
    status: "Ongoing" | "Completed";
    scholarship: string;
  };
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
  };
  _id: string;
  user: string;
  profileImg: string;
  email: string;
  contactNo: string;
  fullName: string;
  designation: string;
  research: any[]; // Adjust if research has a specific structure
  shortBio: string;
  isDeleted: boolean;
  id: string;
};

export type ResearchPaper = {
  _id: string;
  year: number;
  title: string;
  authors: string[];
  journal: string;
  volume: string;
  impactFactor: number;
  journalRank: string;
  visitLink: string;
};

export interface Education {
  degree: string;
  field: string;
  institution: string;
  status: string;
  scholarship?: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

export interface UserProfile {
  id: string;
  user: string;
  fullName: string;
  email: string;
  contactNo: string;
  role: string;
  profileImg?: string;
  shortBio?: string;
  research: string[];
  isDeleted: boolean;
  current: {
    institution: string;
    department: string;
    degree: string;
  };
  education: Education;
  socialLinks: SocialLinks;
  designation: string;
}

export interface TUser {
  _id: string;
  email: string;
  needsPasswordChange: boolean;
  fullName: string;
  designation: string;
  status: string;
  role: string;
  isDeleted: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  passwordChangedAt?: string;
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
  email?: string; // Mark as optional
  fullName?: string;
  role: string;
}

export interface IPost {
  _id?: string;
  imageUrl: string;
  title: string;
  author?: Authors;
  category?: string;
}

export type TPost = {
  _id: string;
  title: string;
  author: Author;
  imageUrl: string;
  content: string;
  category: string;
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TPapers = {
  _id: string;
  year: number;
  title: string;
  authors: string[];
  journal: string;
  volume: string;
  impactFactor: number;
  journalRank: string;
  visitLink: string;
  journalType: string;
  isApproved: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

// JWT Payload interface
export interface JWTPayload {
  sub?: string;
  iat?: number;
  exp?: number;
  role?: string;
  email?: string;
  name?: string;
  [key: string]: any;
}
