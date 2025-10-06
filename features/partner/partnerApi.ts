// features/partner/partnerApi.ts
import { baseApi, tagTypes } from '../api/baseApi';

export const partnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Lấy danh sách partner
    getAllPartners: builder.query<any[], void>({
      query: () => ({
        url: '/partners',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: tagTypes.Partner,
                id,
              })),
              { type: tagTypes.Partner, id: 'LIST' },
            ]
          : [{ type: tagTypes.Partner, id: 'LIST' }],
    }),

    // Tạo partner mới
    createPartner: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: '/partners',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: tagTypes.Partner, id: 'LIST' }],
    }),

    // Cập nhật partner
    updatePartner: builder.mutation<any, { id: string; body: Partial<any> }>({
      query: ({ id, body }) => ({
        url: `/partners/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.Partner, id },
      ],
    }),

    // Xóa partner
    deletePartner: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/partners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: tagTypes.Partner, id },
        { type: tagTypes.Partner, id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetAllPartnersQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnerApi;
