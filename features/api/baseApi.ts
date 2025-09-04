// features/api/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
  credentials: 'include', // gửi refresh token cookie nếu cần
});

export const baseApi = createApi({
  baseQuery,
  tagTypes: ['Auth', 'Project'],
  endpoints: () => ({}),
});
