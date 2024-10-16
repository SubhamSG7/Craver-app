import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: {},
    cartToShow: [],
  },
  reducers: {
    setCart: (state, action) => {
      const { id, type } = action.payload;
      if (typeof type === "string") {
        state.cartList[id] = 1;
      } else if (typeof type === "number") {
        state.cartList[id] = (state.cartList[id] || 0) + type;
        if (state.cartList[id] <= 0) {
          delete state.cartList[id];
        }
      }
    },
    setCartToShow: (state, action) => {
      const categories = action.payload;
      if (categories !== null && Object.keys(state.cartList).length > 0) {
        const data = categories
          .filter((category) => state.cartList[category._id])
          .map((category) => ({
            ...category,
            quantity: state.cartList[category._id],
          }));

        state.cartToShow = data;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.cartList[itemId]) {
        delete state.cartList[itemId];
        state.cartToShow = state.cartToShow.filter(
          (item) => item._id !== itemId
        );

        console.log(`Item with id ${itemId} removed from the cart.`);
      }
    },
  },
});

export const { setCart, setCartToShow, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
