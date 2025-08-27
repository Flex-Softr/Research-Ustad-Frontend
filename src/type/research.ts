// Research Types
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

// Author interface to match API response
export interface Author {
  user?: {
    _id: string;
    email: string;
    fullName: string;
    image?: string;
    designation?: string;
    id: string;
  };
  name: string;
  role: string;
  isRegisteredUser: boolean;
  _id: string;
}

export type TPapers = {
  _id: string;
  year: number;
  title: string;
  authors: Author[]; // Updated to match API response
  journal: string;
  volume: string;
  impactFactor?: number;
  journalRank?: string;
  visitLink: string;
  paperType: "journal" | "conference" | "book";
  status: "published" | "ongoing" | "under_review" | "in_preparation" | "revision";
  isApproved: boolean;
  abstract?: string;
  keywords?: string[];
  citations?: number;
  researchArea?: string;
  funding?: string;
  user?: {
    _id: string;
    email: string;
    fullName: string;
    id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface ResearchPaperForm {
  year: number;
  title: string;
  authors: Author[]; // Updated to match API response
  journal: string;
  volume?: string;
  impactFactor?: number;
  journalRank?: string;
  visitLink: string;
  paperType: "journal" | "conference" | "book";
  status: "published" | "ongoing" | "under_review" | "in_preparation" | "revision";
  abstract?: string;
  keywords?: string[];
  citations?: number;
  researchArea?: string;
  funding?: string;
}

export interface FilterState {
  category: string;
  status: string;
  year: string;
  paperType: string;
}

export interface FilterSidebarProps {
  papers: any[];
  filters: FilterState;
  searchQuery: string;
  onFilterChange: (filterType: keyof FilterState, value: string) => void;
  onSearch: (query: string) => void;
  onClearFilters: () => void;
}

export interface PapersTableProps {
  papers: TPapers[];
}

export interface ResearchPapersPageProps {
  papers?: TPapers[];
  initialStatus?: string;
}

export interface SingleResearchPaperProps {
  paper?: TPapers & {
    abstract?: string;
    keywords?: string[];
    doi?: string;
    citations?: number;
    downloads?: number;
    researchArea?: string;
    funding?: string;
    status: "published" | "ongoing" | "under_review" | "in_preparation" | "revision";
    createdAt?: string;
    updatedAt?: string;
  };
  paperId?: string;
}

export interface RelatedPaper extends TPapers {
  abstract?: string;
  keywords?: string[];
  doi?: string;
  citations?: number;
  downloads?: number;
  researchArea?: string;
  funding?: string;
  status: "published" | "ongoing" | "under_review" | "in_preparation" | "revision";
}
