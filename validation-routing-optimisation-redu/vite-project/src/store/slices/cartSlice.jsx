import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],   // [{ id, name, price, emoji, qty }]
    total: 0,
  },
  reducers: {
    // Payload: { id, name, price, emoji }
    addItem(state, action) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        // Immer lets us "mutate" directly — it produces an immutable update
        existing.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
      // Round to avoid floating-point drift
      state.total = parseFloat((state.total + action.payload.price).toFixed(2));
    },

    // Payload: { id, price }
    removeItem(state, action) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (!existing) return;
      state.total = parseFloat((state.total - action.payload.price).toFixed(2));
      if (existing.qty > 1) {
        existing.qty -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      }
    },

    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
