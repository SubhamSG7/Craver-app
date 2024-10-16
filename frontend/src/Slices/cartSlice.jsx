import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: {},
  },
  reducers: {
    setCart: (state, action) => {
      const { id, type } = action.payload;
      if (typeof type === 'string') {
        state.cartList[id] = 1;
      } else if (typeof type === 'number') {
        state.cartList[id] = (state.cartList[id] || 0) + type;
        if (state.cartList[id] <= 0) {
          delete state.cartList[id];
        }
      }
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
