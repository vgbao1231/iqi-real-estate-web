import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/features/cart/cartSlice';
import authReducer from '@/features/auth/authSlice';
import { baseApi } from '@/features/api/baseApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
