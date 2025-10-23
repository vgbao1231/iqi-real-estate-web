'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

// Base query gốc
const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('accessToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

// Base query with auto-refresh
const baseQueryWithAuth: typeof rawBaseQuery = async (
  args: any,
  api,
  extraOptions
) => {
  let result: any = await rawBaseQuery(args, api, extraOptions);

  // Nếu mutation thành công và có message → toast success
  if (!result.error && result.data?.message && args.method !== 'GET') {
    toast.success(result.data.message);
  }

  // Nếu 401 → thử refresh token
  if (result.error && result.error.status === 401) {
    const rememberMe = Cookies.get('remember_me');

    if (rememberMe) {
      // gọi endpoint refresh token
      const refreshResult: any = await rawBaseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // lưu access token mới → không set expires, để BE lo hết hạn
        Cookies.set('accessToken', refreshResult.data.accessToken);

        // gọi lại request ban đầu
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        // refresh fail → logout
        clearAuthCookies();
        api.dispatch({ type: 'auth/logout' });
        // if (typeof window !== 'undefined') window.location.href = '/login';
      }
    } else {
      // không có refresh token hoặc không remember → logout
      clearAuthCookies();
      api.dispatch({ type: 'auth/logout' });
      // if (typeof window !== 'undefined') window.location.href = '/login';
    }
  }

  // Toast error từ backend nếu có
  if (result.error) {
    const errMessage = result.error.data?.message || 'Lỗi hệ thống';

    if (Array.isArray(errMessage)) {
      errMessage.forEach((msg) => toast.error(msg));
    } else {
      toast.error(errMessage);
    }
  }

  return result;
};

function clearAuthCookies() {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('remember_me');
}

export const tagTypes = {
  Auth: 'Auth',
  Project: 'Project',
  User: 'User',
  Partner: 'Partner',
  Article: 'Article',
  Contact: 'Contact',
  Merchandise: 'Merchandise',
} as const;

export const baseApi = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: Object.values(tagTypes),
  endpoints: () => ({}),
});
