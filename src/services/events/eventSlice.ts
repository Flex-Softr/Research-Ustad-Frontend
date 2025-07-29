import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const API_BASE_URL = "http://localhost:5000/api/v1";

// Types
export interface Event {
  _id?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  status: string;
  category: string;
  imageUrl: string;
  registrationLink: string;
  eventDuration: number;
  speakers: Speaker[];
}

export interface Speaker {
  name: string;
  bio: string;
  imageUrl: string;
}

interface EventState {
  events: Event[];
  event: Event | null;
  isLoading: boolean;
  error: string | null;
}

// Initial State
const initialState: EventState = {
  events: [],
  event: null,
  isLoading: false,
  error: null,
};

// Fetch all events thunk
export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE_URL}/event`);
      const events = await res.json();
      console.log("events", events);
      if (!res.ok) throw new Error(events.message || "Failed to fetch events");
      return events.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch single event
export const fetchSingleEvent = createAsyncThunk(
  "events/fetchOne",
  async (id: string, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE_URL}/event/${id}`);
      const event = await res.json();
      console.log("Fetched single event:", event); // ✅ check shape here
      return event.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add event
// ✅ Add Event using FormData
export const addEvent = createAsyncThunk(
  "events/add",
  async (formData: FormData, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    try {
      const res = await fetch(`${API_BASE_URL}/event`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type here — browser handles it for FormData
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add event");
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update event
export const updateEvent = createAsyncThunk(
  "events/update",
  async ({ _id, formData }: { _id: number; formData: FormData }, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    console.log("ifddddddddddddddddd", _id)

    try {
      const res = await fetch(`${API_BASE_URL}/event/${_id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type — browser handles it for FormData
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update event");

      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete event
export const deleteEvent = createAsyncThunk(
  "events/delete",
  async (_id: number, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    try {
      const res = await fetch(`${API_BASE_URL}/event/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete event");
      return _id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all events
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch one
      .addCase(fetchSingleEvent.fulfilled, (state, action) => {
        state.event = action.payload;
      })

      // Add event
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })

      // Update event
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.events = state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
      })

      // Delete event
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e._id !== action.payload);
      });
  },
});

export default eventSlice.reducer;
