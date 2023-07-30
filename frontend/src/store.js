import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to local storage

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
    resetCart: (state, action) => {
      state.bouquet = [];
      state.basket = [];
    },
  },
});

export const { addItem, decrease, increase, resetCart } = cartSlice.actions;

const userSlice = createSlice({
  name: 'user',
  initialState: { isLoggedIn: false },
  reducers: {
    login: (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  user: userSlice.reducer,
});

// Configuration for Redux Persist
const persistConfig = {
  key: 'root', // The key in which your persisted data will be stored in the storage
  storage,
  whitelist: ['cart', 'user'], // Specify the reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

// Create a persisted store
const persistedStore = persistStore(store);

export { store, persistedStore };
