import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

// Types
export interface Category {
  _id: string;
  name: string;
  description?: string;
  courseCount: number;
  totalEnrollments: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface CategoryState {
  categories: Category[];
  category: Category | null;
  isLoading: boolean;
  error: string | null;
}

const API_BASE_URL = "http://localhost:5000/api/v1";

const initialState: CategoryState = {
  categories: [],
  category: null,
  isLoading: false,
  error: null,
};

// ----------------------
// Async Thunks
// ----------------------

// Get all categories
export const fetchCategories = createAsyncThunk("categories/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await fetch(`${API_BASE_URL}/category`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch categories");
    return data.data || [];
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Get single category
export const fetchSingleCategory = createAsyncThunk("categories/fetchOne", async (id: string, thunkAPI) => {
  try {
    const res = await fetch(`${API_BASE_URL}/category/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch category");
    return data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Add category
export const addCategory = createAsyncThunk("categories/add", async (categoryData: { name: string; description?: string; status?: 'active' | 'inactive' }, thunkAPI) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  try {
    const res = await fetch(`${API_BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add category");
    return data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Update category
export const updateCategory = createAsyncThunk("categories/update", async ({ id, categoryData }: { id: string; categoryData: Partial<Category> }, thunkAPI) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  try {
    const res = await fetch(`${API_BASE_URL}/category/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update category");
    return data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Delete category
export const deleteCategory = createAsyncThunk("categories/delete", async (id: string, thunkAPI) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  try {
    const res = await fetch(`${API_BASE_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete category");
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// ----------------------
// Slice
// ----------------------

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch single
      .addCase(fetchSingleCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchSingleCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((c) => c._id !== action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer; 