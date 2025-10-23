import { baseApi, tagTypes } from '../api/baseApi';

export const merchandiseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMerchandise: builder.query<any[], void>({
      query: () => '/merchandises',
      providesTags: (result) =>
        result
          ? [
              { type: tagTypes.Merchandise, id: 'LIST' },
              ...result.map((user) => ({
                type: tagTypes.Merchandise,
                id: user.id,
              })),
            ]
          : [{ type: tagTypes.Merchandise, id: 'LIST' }],
    }),

    getMerchandiseById: builder.query<any, string>({
      query: (id) => `/merchandises/${id}`,
      providesTags: (result, error, id) => [{ type: tagTypes.Merchandise, id }],
    }),

    createMerchandise: builder.mutation<any, any>({
      query: (body) => ({
        url: '/merchandises',
        method: 'POST',
        body,
      }),
      invalidatesTags: [tagTypes.Merchandise],
    }),

    updateMerchandise: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/merchandises/${id}`,
        method: 'PATCH',
        body,
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.Merchandise, id },
        { type: tagTypes.Merchandise, id: 'LIST' },
      ],
    }),

    deleteMerchandise: builder.mutation<void, string>({
      query: (id) => ({
        url: `/merchandises/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.Merchandise],
    }),
  }),
});

export const {
  useGetAllMerchandiseQuery,
  useGetMerchandiseByIdQuery,
  useCreateMerchandiseMutation,
  useUpdateMerchandiseMutation,
  useDeleteMerchandiseMutation,
} = merchandiseApi;
