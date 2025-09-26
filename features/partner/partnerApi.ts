// features/partner/partnerApi.ts
import { baseApi } from '../api/baseApi';

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
              ...result.map(({ id }) => ({ type: 'Partner' as const, id })),
              { type: 'Partner', id: 'LIST' },
            ]
          : [{ type: 'Partner', id: 'LIST' }],
    }),

    // Tạo partner mới
    createPartner: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: '/partners',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Partner', id: 'LIST' }],
    }),

    // Cập nhật partner
    updatePartner: builder.mutation<any, { id: string; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/partners/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Partner', id }],
    }),

    // Xóa partner
    deletePartner: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/partners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Partner', id },
        { type: 'Partner', id: 'LIST' },
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
