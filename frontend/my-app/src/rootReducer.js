// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import staffcustomerReducer from './slice/staffcustomerSlice';
import cartSlice from './slice/cartSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  role: staffcustomerReducer,
  cart:cartSlice
});

export default rootReducer;
