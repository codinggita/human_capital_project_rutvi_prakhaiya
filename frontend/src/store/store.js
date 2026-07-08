import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import priceReducer from './priceSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    prices: priceReducer,
    ui: uiReducer,
  },
});
