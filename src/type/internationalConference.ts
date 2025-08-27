export interface InternationalConference {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInternationalConferenceData {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface UpdateInternationalConferenceData {
  title?: string;
  description?: string;
  imageUrl?: string;
}
