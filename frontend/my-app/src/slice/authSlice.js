// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state,action) {
      state.isLoggedIn = action.payload;
      state.token = action.payload.token;
    },
    logout(state,action) {
      state.isLoggedIn = action.payload;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
