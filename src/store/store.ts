import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../services/events/eventSlice";
import blogsReducer from "../services/blogs/blogsSlice";
import coursesReducer from "../services/courses/coursesSlice";
import categoriesReducer from "../services/categories/categoriesSlice";
import blogCategoriesReducer from "../services/blogCategories/blogCategoriesSlice";

export const store = configureStore({
  reducer: {
    event: eventReducer,
    blogs: blogsReducer,
    courses: coursesReducer,
    categories: categoriesReducer,
    blogCategories: blogCategoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
