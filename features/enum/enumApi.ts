import { baseApi } from '../api/baseApi';

export const enumApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEnums: builder.query<any, void>({
      query: () => ({
        url: '/enums',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllEnumsQuery } = enumApi;
