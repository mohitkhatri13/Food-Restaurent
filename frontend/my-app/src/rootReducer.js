// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import staffcustomerReducer from './slice/staffcustomerSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  role: staffcustomerReducer,
});

export default rootReducer;
