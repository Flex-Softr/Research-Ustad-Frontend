import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { handleNetworkError } from "@/lib/utils";
import { api } from "@/config";

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

// Fetch all blogs (public - only approved)
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${api.baseUrl}/blog`, {});
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch blogs");
      return data.data.blogs || [];
    } catch (error: any) {
      console.error("Blog fetch error:", error);
      return thunkAPI.rejectWithValue(handleNetworkError(error));
    }
  }
);

// Fetch all blogs for admin (including pending and rejected)
export const fetchAllBlogsForAdmin = createAsyncThunk(
  "blogs/fetchAllForAdmin",
  async (_, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    try {
      const res = await fetch(`${api.baseUrl}/blog/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch blogs");
      return data.data.blogs || [];
    } catch (error: any) {
      console.error("Admin blog fetch error:", error);
      return thunkAPI.rejectWithValue(handleNetworkError(error));
    }
  }
);

// Fetch user's own blogs
export const fetchUserBlogs = createAsyncThunk(
  "blogs/fetchUserBlogs",
  async (_, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    try {
      const res = await fetch(`${api.baseUrl}/blog/author`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to fetch user blogs");
      return data.data.blogs || [];
    } catch (error: any) {
      console.error("User blog fetch error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch single blog by ID
export const fetchSingleBlog = createAsyncThunk(
  "blogs/fetchOne",
  async (id: string, thunkAPI) => {
    try {
      const res = await fetch(`${api.baseUrl}/blog/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch blog");
      return data.data.blog;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add blog
export const addBlog = createAsyncThunk(
  "blogs/add",
  async (formData: FormData, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    try {
      const res = await fetch(`${api.baseUrl}/blog`, {
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
  }
);

// Update blog
export const updateBlog = createAsyncThunk(
  "blogs/update",
  async ({ id, formData }: { id: string; formData: FormData }, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    try {
      const res = await fetch(`${api.baseUrl}/blog/${id}`, {
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
  }
);

// Update blog status (approve/reject)
export const updateBlogStatus = createAsyncThunk(
  "blogs/updateStatus",
  async (
    { id, status }: { id: string; status: "approved" | "rejected" },
    thunkAPI
  ) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    try {
      const res = await fetch(`${api.baseUrl}/blog/${id}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to update blog status");
      return data.data.blog;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete blog
export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (id: string, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    try {
      const res = await fetch(`${api.baseUrl}/blog/${id}`, {
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
  }
);

// ----------------------
// Slice
// ----------------------

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all (public)
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

      // Fetch all for admin
      .addCase(fetchAllBlogsForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch user blogs
      .addCase(fetchUserBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchUserBlogs.rejected, (state, action) => {
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
        const index = state.blogs.findIndex(
          (b) => b._id === action.payload._id
        );
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

      // Update status
      .addCase(updateBlogStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlogStatus.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateBlogStatus.rejected, (state, action) => {
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
