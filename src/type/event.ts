// Event Types
export interface EventSpeaker {
  name: string;
  bio: string;
  imageUrl: string;
}

export interface CustomEvent {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  eventDuration: number;
  startDate: string;
  endDate: string;
  registered: number;
  capacity: number;
  tags: string[];
  price: number | string;

  location: string;
  speakers: EventSpeaker[];
  imageUrl: string;
  registrationLink: string;
  category: string;
  maxAttendees: number;
  status: 'upcoming' | 'ongoing' | 'finished';
}

// Alias for backward compatibility
export type Event = CustomEvent;

export interface Speaker {
  name: string;
  bio: string;
  imageUrl: string;
}

export interface EventFormProps {
  event?: CustomEvent;
  onSave: (event: CustomEvent) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export interface PaginatedEventsResponse {
  events: CustomEvent[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface EventsFilter {
  status?: "all" | "upcoming" | "past";
  category?: string;
  page?: number;
  limit?: number;
}

export interface EventData {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
} 