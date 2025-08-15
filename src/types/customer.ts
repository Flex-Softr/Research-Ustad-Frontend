export interface CompanyRecord {
  id: string;
  company: string;
  disDate: string; // Disbursement Date
  amount: string;
  age: string;
  endingDate: string;
  bod: string; // Beginning of Day
  eod: string; // End of Day
  mobile: string;
  note: string;
  noteStatus: "Regular" | "Not Good" | "Good";
  scheme?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  address: string;
  district: string;
  superAdminComment?: string;
  companyRecords: CompanyRecord[];
}

export interface CustomerFormData {
  name: string;
  phone: string;
  address: string;
  district: string;
  superAdminComment: string;
  companyRecords: Omit<CompanyRecord, "id">[];
}
