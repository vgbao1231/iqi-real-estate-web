import { baseApi } from '../api/baseApi';

export const provincesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProvinces: builder.query<any[], void>({
      query: () => ({
        url: 'https://provinces.open-api.vn/api/?depth=2',
        credentials: 'omit',
      }),
    }),
  }),
});

export const { useGetProvincesQuery } = provincesApi;
