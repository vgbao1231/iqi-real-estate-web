import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/features/cart/cartSlice';
import authReducer from '@/features/auth/authSlice';
import enumReducer from '@/features/enum/enumSlice';
import locationReducer from '@/features/location/locationSlice';
import { baseApi } from '@/features/api/baseApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    enum: enumReducer,
    location: locationReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
