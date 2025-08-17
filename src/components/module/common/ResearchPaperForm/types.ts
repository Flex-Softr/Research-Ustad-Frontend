export interface Author {
  // For registered users (preferred)
  user?: string; // ObjectId as string
  
  // For custom authors (when no user ObjectId)
  name?: string;
  
  // Role for both registered and custom authors
  role: string;
  
  // Additional metadata
  isRegisteredUser?: boolean;
}

export interface ResearchPaperFormData {
  year: number;
  title: string;
  authors: Author[];
  journal: string;
  volume?: string;
  impactFactor?: number;
  journalRank?: string;
  visitLink: string;
  paperType: string;
  status: "published" | "ongoing";
  abstract?: string;
  keywords?: string[];
  citations?: number;
  researchArea?: string;
  funding?: string;
}

export interface ResearchPaperFormProps {
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
  className?: string;
  title?: string;
}
