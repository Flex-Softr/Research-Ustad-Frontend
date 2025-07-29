import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const API_BASE_URL = "http://localhost:5000/api/v1";

// ----------------------
// Types
// ----------------------

export interface Blog {
  _id?: string;
  title: string;
  author: string; // This will be ObjectId (string)
  image: string;
  shortDescription: string;
  publishedDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BlogState {
  blogs: Blog[];
  blog: Blog | null;
  isLoading: boolean;
  error: string | null;
}

// ----------------------
// Initial State
// ----------------------

const initialState: BlogState = {
  blogs: [],
  blog: null,
  isLoading: false,
  error: null,
};

// ----------------------
// Async Thunks
// ----------------------

// Fetch all blogs
export const fetchBlogs = createAsyncThunk("blogs/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await fetch(`${API_BASE_URL}/blog`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch blogs");
    return data.blogs;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Fetch single blog by ID
export const fetchSingleBlog = createAsyncThunk("blogs/fetchOne", async (id: string, thunkAPI) => {
  try {
    const res = await fetch(`${API_BASE_URL}/blog/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch blog");
    return data.blog;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Add blog
export const addBlog = createAsyncThunk("blogs/add", async (blogData: Blog, thunkAPI) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  try {
    const res = await fetch(`${API_BASE_URL}/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add blog");
    return data.blog;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Delete blog
export const deleteBlog = createAsyncThunk("blogs/delete", async (id: string, thunkAPI) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  try {
    const res = await fetch(`${API_BASE_URL}/blog/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete blog");
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// ----------------------
// Slice
// ----------------------

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch single
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.blog = action.payload;
      })

      // Add
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })

      // Delete
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      });
  },
});

export default blogsSlice.reducer;
