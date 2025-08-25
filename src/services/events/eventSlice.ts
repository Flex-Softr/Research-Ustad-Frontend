import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { api } from "@/config";

// Types
import { CustomEvent, Speaker } from "@/type";

interface EventState {
  events: CustomEvent[];
  event: CustomEvent | null;
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
      const res = await fetch(`${api.baseUrl}/event`);
      const events = await res.json();
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
      const res = await fetch(`${api.baseUrl}/event/${id}`);
      const event = await res.json();
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
      const res = await fetch(`${api.baseUrl}/event`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
  async ({ _id, formData }: { _id: string; formData: FormData }, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    try {
      const res = await fetch(`${api.baseUrl}/event/${_id}`, {
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
  async (_id: string, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    try {
      const res = await fetch(`${api.baseUrl}/event/${_id}`, {
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
  reducers: {
    // Real-time update action
    updateEventsRealtime: (state, action) => {
      state.events = action.payload;
    },
  },
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
      .addCase(addEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update event
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.events = state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete event
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e._id !== action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateEventsRealtime } = eventSlice.actions;
export default eventSlice.reducer;
