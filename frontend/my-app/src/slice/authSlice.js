// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = action.payload;
    },
    logout(state, action) {
      state.isLoggedIn = action.payload;
      state.user = null; // Clear user data on logout
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user; // Set user state to the received user object
      state.isLoggedIn = true; // Optionally set isLoggedIn to true on login success
    },
  },
});

export const { login, logout, loginSuccess } = authSlice.actions;

export default authSlice.reducer;
