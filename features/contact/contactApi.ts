import { baseApi, tagTypes } from '../api/baseApi';

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContact: builder.query<any, void>({
      query: () => ({
        url: '/contact',
        method: 'GET',
      }),
    }),
    updateContact: builder.mutation<any, any>({
      query: (body) => ({
        url: '/contact',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [tagTypes.Contact],
    }),
  }),
});

export const { useGetContactQuery, useUpdateContactMutation } = contactApi;
