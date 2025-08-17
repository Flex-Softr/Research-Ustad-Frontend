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
  paperType: "journal" | "conference";
  status: "published" | "ongoing";
  isApproved: boolean;
  abstract?: string;
  keywords?: string[];
  citations?: number;
  researchArea?: string;
  funding?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface ResearchPaperForm {
  year: number;
  title: string;
  authors: string[];
  journal: string;
  volume?: string;
  impactFactor?: number;
  journalRank?: string;
  visitLink: string;
  paperType: "journal" | "conference";
  status: "published" | "ongoing";
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
    status: "published" | "ongoing";
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
  status: "published" | "ongoing";
}
