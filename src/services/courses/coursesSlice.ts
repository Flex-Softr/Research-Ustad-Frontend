import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

// Types
import { Course } from "@/type";

interface CourseState {
  courses: Course[];
  course: Course | null;
  isLoading: boolean;
  error: string | null;
}

const API_BASE_URL = "http://localhost:5000/api/v1";

const initialState: CourseState = {
  courses: [],
  course: null,
  isLoading: false,
  error: null,
};

// ----------------------
// Async Thunks
// ----------------------

// Get all courses
export const fetchCourses = createAsyncThunk("courses/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await fetch(`${API_BASE_URL}/course`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch courses");
    return data.data || [];
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Get single course
export const fetchSingleCourse = createAsyncThunk("courses/fetchOne", async (id: string, thunkAPI) => {
  try {
    const res = await fetch(`${API_BASE_URL}/course/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch course");
    return data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Add course
export const addCourse = createAsyncThunk("courses/add", async (formData: FormData, thunkAPI) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  try {
    const res = await fetch(`${API_BASE_URL}/course`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData, let the browser set it
      },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add course");
    return data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Update course
export const updateCourse = createAsyncThunk("courses/update", async ({ id, formData }: { id: string; formData: FormData }, thunkAPI) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  try {
    const res = await fetch(`${API_BASE_URL}/course/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData, let the browser set it
      },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update course");
    return data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Delete course
export const deleteCourse = createAsyncThunk("courses/delete", async (id: string, thunkAPI) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  try {
    const res = await fetch(`${API_BASE_URL}/course/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete course");
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// ----------------------
// Slice
// ----------------------

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch single
      .addCase(fetchSingleCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleCourse.fulfilled, (state, action) => {
        state.course = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchSingleCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })

      // Update
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        // Update the course in the courses array
        const index = state.courses.findIndex(course => course._id === action.payload._id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        // Update the single course if it's the same one
        if (state.course && state.course._id === action.payload._id) {
          state.course = action.payload;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((course) => course._id !== action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default coursesSlice.reducer;
