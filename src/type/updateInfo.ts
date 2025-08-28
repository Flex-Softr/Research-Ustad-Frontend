import { UseFormRegister, FieldErrors } from "react-hook-form";

// Conference interface for form data
export interface Conference {
  name?: string;
  role?: string;
  topic?: string;
}

// Form data interface for React Hook Form
export interface UpdateInfoFormData {
  // Basic Information
  fullName?: string;
  contactNo?: string;
  profileImg?: string;
  shortBio?: string;

  // Current Institution
  currentInstitution?: string;
  currentDepartment?: string;
  currentDegree?: string;
  currentInstDesignation?: string;

  // Education
  educationDegree?: string;
  educationField?: string;
  educationInstitution?: string;
  educationStatus?: "Ongoing" | "Completed" | "";
  scholarship?: string;

  // Social Links
  linkedin?: string;
  researchgate?: string;
  googleScholar?: string;
  orcid?: string;

  // Citations
  citations?: number;

  // Expertise (array of strings)
  expertise?: string[];

  // Awards (array of strings)
  awards?: string[];

  // Conferences (array of conference objects)
  conferences?: Conference[];

  // System fields (hidden)
  isDeleted?: boolean;
}

// Member data interface for API response
export interface MemberData {
  id?: string;
  fullName?: string;
  contactNo?: string;
  designation?: string;
  profileImg?: string;
  shortBio?: string;
  isDeleted?: boolean;
  current?: {
    inst_designation: string;
    institution: string;
    department: string;
    degree: string;
  };
  education?: {
    degree: string;
    field: string;
    institution: string;
    status: string;
    scholarship: string;
  };
  research?: string[];
  socialLinks?: {
    linkedin?: string;
    researchgate?: string;
    google_scholar?: string;
    orcid?: string;
  };
  citations?: number;
  expertise?: string[];
  awards?: string[];
  conferences?: Conference[];
}

// Update payload interface for API request
export interface UpdateMemberPayload {
  ResearchMembar: {
    // Basic Information
    fullName: string;
    contactNo: string;
    designation: string;
    profileImg: string;
    shortBio: string;
    isDeleted: boolean;

    // Current Institution
    current: {
      inst_designation: string;
      institution: string;
      department: string;
      degree: string;
    };

    // Education
    education: {
      degree: string;
      field: string;
      institution: string;
      status: string;
      scholarship: string;
    };

    // Keep existing research data
    research: string[];

    // Social Links
    socialLinks: {
      linkedin: string;
      researchgate: string;
      google_scholar: string;
      orcid: string;
    };

    // Citations
    citations: number;

    // Expertise (filtered array)
    expertise: string[];

    // Awards (filtered array)
    awards: string[];

    // Conferences (filtered array)
    conferences: Conference[];
  };
}

// Component props interfaces for UpdateInfo form
export interface UpdateInfoBasicSectionProps {
  register: UseFormRegister<UpdateInfoFormData>;
  errors: FieldErrors<UpdateInfoFormData>;
  selectedFile?: File | null;
  onFileChange?: (file: File | null) => void;
  currentProfileImg?: string;
}

export interface UpdateInfoCurrentInstitutionSectionProps {
  register: UseFormRegister<UpdateInfoFormData>;
  errors: FieldErrors<UpdateInfoFormData>;
}

export interface UpdateInfoEducationSectionProps {
  register: UseFormRegister<UpdateInfoFormData>;
  errors: FieldErrors<UpdateInfoFormData>;
}

export interface UpdateInfoSocialLinksSectionProps {
  register: UseFormRegister<UpdateInfoFormData>;
  errors: FieldErrors<UpdateInfoFormData>;
}

export interface UpdateInfoCitationsSectionProps {
  register: UseFormRegister<UpdateInfoFormData>;
  errors: FieldErrors<UpdateInfoFormData>;
}

export interface UpdateInfoExpertiseSectionProps {
  expertiseList: string[];
  onAddExpertise: () => void;
  onRemoveExpertise: (index: number) => void;
  onUpdateExpertise: (index: number, value: string) => void;
  errors: FieldErrors<UpdateInfoFormData>;
}

export interface UpdateInfoAwardsSectionProps {
  awardsList: string[];
  onAddAward: () => void;
  onRemoveAward: (index: number) => void;
  onUpdateAward: (index: number, value: string) => void;
  errors: FieldErrors<UpdateInfoFormData>;
}

export interface UpdateInfoConferencesSectionProps {
  conferencesList: Conference[];
  onAddConference: () => void;
  onRemoveConference: (index: number) => void;
  onUpdateConference: (index: number, field: keyof Conference, value: string) => void;
  errors: FieldErrors<UpdateInfoFormData>;
}
