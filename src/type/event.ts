// Event Types
export interface EventSpeaker {
  name: string;
  bio: string;
  imageUrl: string;
}

export interface Event {
  _id: number;
  id?: string;
  title: string;
  description: string;
  eventDuration: number;
  startDate: string;
  endDate: string;
  location: string;
  speakers: EventSpeaker[];
  imageUrl: string;
  registrationLink: string;
  category: string;
  maxAttendees: number;
  status: string;
  capacity: number;
  registered: number;
  price: string;
  tags?: string[];
}

export interface Speaker {
  name: string;
  bio: string;
  imageUrl: string;
}

export interface EventFormProps {
  event?: Event;
  onSave: (event: Event) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export interface PaginatedEventsResponse {
  events: Event[];
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