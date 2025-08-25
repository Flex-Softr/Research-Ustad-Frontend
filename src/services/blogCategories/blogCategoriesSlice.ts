import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { api } from "@/config";

// Types
export interface BlogCategory {
  _id: string;
  name: string;
  description?: string;
  blogCount: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

interface BlogCategoryState {
  categories: BlogCategory[];
  category: BlogCategory | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BlogCategoryState = {
  categories: [],
  category: null,
  isLoading: false,
  error: null,
};

// ----------------------
// Async Thunks
// ----------------------

// Get all blog categories
export const fetchBlogCategories = createAsyncThunk(
  "blogCategories/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${api.baseUrl}/blog-category`);
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to fetch blog categories");
      return data.data || [];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get single blog category
export const fetchSingleBlogCategory = createAsyncThunk(
  "blogCategories/fetchOne",
  async (id: string, thunkAPI) => {
    try {
      const res = await fetch(`${api.baseUrl}/blog-category/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch blog category");
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add blog category
export const addBlogCategory = createAsyncThunk(
  "blogCategories/add",
  async (
    categoryData: {
      name: string;
      description?: string;
      status?: "active" | "inactive";
    },
    thunkAPI
  ) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    try {
      const res = await fetch(`${api.baseUrl}/blog-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add blog category");
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update blog category
export const updateBlogCategory = createAsyncThunk(
  "blogCategories/update",
  async (
    { id, categoryData }: { id: string; categoryData: Partial<BlogCategory> },
    thunkAPI
  ) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    try {
      const res = await fetch(`${api.baseUrl}/blog-category/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update blog category");
      return data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete blog category
export const deleteBlogCategory = createAsyncThunk(
  "blogCategories/delete",
  async (id: string, thunkAPI) => {
    const cookies = new Cookies();
    const token = cookies.get("accessToken");

    try {
      const res = await fetch(`${api.baseUrl}/blog-category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete blog category");
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ----------------------
// Slice
// ----------------------

const blogCategoriesSlice = createSlice({
  name: "blogCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchBlogCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch single
      .addCase(fetchSingleBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleBlogCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchSingleBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBlogCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c._id !== action.payload
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default blogCategoriesSlice.reducer;
