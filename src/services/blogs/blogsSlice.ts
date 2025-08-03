import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

// const API_BASE_URL = "http://localhost:5000/api/v1";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API!;


// ----------------------
// Types
// ----------------------

import { Blog } from "@/type";

interface BlogState {
  blogs: Blog[];
  blog: Blog | null;
  isLoading: boolean;
  error: string | null;
}

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
    const res = await fetch(`${API_BASE_URL}/blog`, {
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch blogs");
    return data.data.blogs || [];
  } catch (error: any) {
    console.error("Blog fetch error:", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Fetch single blog by ID
export const fetchSingleBlog = createAsyncThunk("blogs/fetchOne", async (id: string, thunkAPI) => {
  try {
    const res = await fetch(`${API_BASE_URL}/blog/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch blog");
    return data.data.blog;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Add blog
export const addBlog = createAsyncThunk("blogs/add", async (formData: FormData, thunkAPI) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  try {
    const res = await fetch(`${API_BASE_URL}/blog`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add blog");
    return data.data.blog;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Update blog
export const updateBlog = createAsyncThunk("blogs/update", async ({ id, formData }: { id: string; formData: FormData }, thunkAPI) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  try {
    const res = await fetch(`${API_BASE_URL}/blog/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update blog");
    return data.data.blog;
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
      .addCase(fetchSingleBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs = [...state.blogs, action.payload];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default blogsSlice.reducer;
