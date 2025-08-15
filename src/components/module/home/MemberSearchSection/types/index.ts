export interface SearchResult {
  _id: string;
  fullName: string;
  nid: string;
  phoneNumber: string;
  district: string;
  fullAddress: string;
  photo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  clientRecords: ClientRecord[];
}

export interface ClientRecord {
  _id: string;
  disDate: string;
  amount: string;
  age: string;
  endingDate: string;
  bod: string;
  eod: string;
  note: string;
  noteStatus: string;
  scheme: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  company: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: SearchResult;
}
