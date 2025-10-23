import { baseApi, tagTypes } from '../api/baseApi';

interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  image: { url: string; publicId: string } | File | null;
  accessToken: string;
  refreshToken: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginPayload>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      invalidatesTags: [tagTypes.Auth],
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: [tagTypes.Auth],
    }),

    me: builder.query<User, void>({
      query: () => ({
        url: '/auth/me',
        credentials: 'include',
      }),
      providesTags: [tagTypes.Auth],
    }),
    updateProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: `/auth/profile`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [tagTypes.Auth],
    }),
    changePassword: builder.mutation<any, any>({
      query: (body) => ({
        url: '/auth/password',
        method: 'PATCH',
        body,
      }),
    }),
    sendOtp: builder.mutation<{ message: string }, any>({
      query: (body) => ({
        url: '/auth/otp/send',
        method: 'POST',
        body,
      }),
    }),

    verifyOtp: builder.mutation<{ message: string }, any>({
      query: (body) => ({
        url: '/auth/otp/verify',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
