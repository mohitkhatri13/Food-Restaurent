// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  token:null
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
      state.user = null; 
    },
    // for storing the userid
    loginSuccess: (state, action) => {
      state.user = action.payload.user; 
      state.isLoggedIn = true; 
    },
    //for storing the token of the user
    usertoken:(state , action)=>{
      state.user = action.payload.token
    }
    
  },
});

export const { login, logout, loginSuccess ,usertoken} = authSlice.actions;

export default authSlice.reducer;
