import { createSlice } from "@reduxjs/toolkit";
import { Checkout } from "../Api/Checkout";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: {},
    cartToShow: [],
    status: null,
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
    setcartStatus: (state, action) => {
      state.status = action.payload;
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
    emptyCartList: (state, action) => {
      state.cartList = {};
      state.cartToShow = [];
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
  extraReducers: (builder) => {
    builder
      .addCase(Checkout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(Checkout.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(Checkout.rejected, (state, action) => {
        state.status = action.payload;
      });
  },
});

export const {
  setCart,
  setCartToShow,
  removeFromCart,
  emptyCartList,
  setcartStatus,
} = cartSlice.actions;
export default cartSlice.reducer;
