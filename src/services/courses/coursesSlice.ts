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
    const res = await fetch(`${API_BASE_URL}/courses`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch courses");
    return data.courses;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Get one course
export const fetchSingleCourse = createAsyncThunk("courses/fetchOne", async (id: string, thunkAPI) => {
  try {
    const res = await fetch(`${API_BASE_URL}/courses/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch course");
    return data.course;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Add course
export const addCourse = createAsyncThunk("courses/add", async (courseData: Course, thunkAPI) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  try {
    const res = await fetch(`${API_BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add course");
    return data.course;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Delete course
export const deleteCourse = createAsyncThunk("courses/delete", async (id: string, thunkAPI) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  try {
    const res = await fetch(`${API_BASE_URL}/courses/${id}`, {
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

      // Fetch one
      .addCase(fetchSingleCourse.fulfilled, (state, action) => {
        state.course = action.payload;
      })

      // Add
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })

      // Delete
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((course) => course._id !== action.payload);
      });
  },
});

export default coursesSlice.reducer;
