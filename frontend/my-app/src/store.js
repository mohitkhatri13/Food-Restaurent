import { configureStore } from "@reduxjs/toolkit";
// import searchReducer from "./slices/searchslice"; // Adjust the path as needed

export const store = configureStore({
  reducer: {
    // search: searchReducer, // Add your search slice reducer here
    // Add other reducers if needed
  },
});
