import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // Array of items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, name, price } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ id, name, price, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== id);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
