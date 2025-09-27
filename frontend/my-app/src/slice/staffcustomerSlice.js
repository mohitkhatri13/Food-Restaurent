import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCustomer: false,
};

const staffcustomerSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    checkrole(state,action) {
      state.isCustomer = action.payload;
      localStorage.setItem("isCustomer",action.payload);
    },
  },
});

export const { checkrole } = staffcustomerSlice.actions;
export default staffcustomerSlice.reducer;