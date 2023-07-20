import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { bouquet: [], basket: [] },
  reducers: {
    addItem: (state, action) => {
      const { type, ...payload } = action;
      state[type].push(payload);
    },
    increase: (state, action) => {
      const { type, ...payload } = action;
      const index = state[type].findIndex((item) => item.id === payload.id);
      state[type][index].count++;
    },
    decrease: (state, action) => {
      const { type, ...payload } = action;
      const index = state[type].findIndex((item) => item.id === payload.id);
      state[type][index].count--;
    },
  },
});

export const { addItem, increase, decrease } = cartSlice.actions;

const rootReducer = {
  cart: cartSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
