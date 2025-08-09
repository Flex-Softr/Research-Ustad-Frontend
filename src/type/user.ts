// User Types
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

export interface Education {
  degree: string;
  field: string;
  institution: string;
  status: string;
  scholarship?: string;
}

export interface SocialLinks {
  google_scholar?: string;
  researchgate?: string;
  linkedin?: string;
}

export interface TResearchAssociate {
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
    google_scholar: string;
    researchgate: string;
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
}

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


// users form type
export interface FormData {
  fullName: string;
  email: string;
  password: string;
  role: string;
  designation: string;
  contactNo?: string;
}