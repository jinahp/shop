import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { bouquet: [], basket: [] },
  reducers: {
    addItem: (state, action) => {
      const { payload } = action;
      console.log({ payload });
      state[payload.type].push(payload);
    },
    increase: (state, action) => {
      const { payload } = action;
      const { id, option, type } = payload;
      const index = state[type].findIndex(
        (item) => item.id === id && item.option.value == option.value
      );
      state[type][index].option.count++;
    },
    decrease: (state, action) => {
      const { payload } = action;
      const { id, option, type } = payload;
      const index = state[type].findIndex(
        (item) => item.id === id && item.option.value == option.value
      );
      state[type][index].option.count--;
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
