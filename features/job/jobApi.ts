import { baseApi, tagTypes } from '../api/baseApi';

export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllJob: builder.query<any[], void>({
      query: () => '/jobs',
      providesTags: (result) =>
        result
          ? [
              { type: tagTypes.Job, id: 'LIST' },
              ...result.map((user) => ({
                type: tagTypes.Job,
                id: user.id,
              })),
            ]
          : [{ type: tagTypes.Job, id: 'LIST' }],
    }),

    getJobById: builder.query<any, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: tagTypes.Job, id }],
    }),

    createJob: builder.mutation<any, any>({
      query: (body) => ({
        url: '/jobs',
        method: 'POST',
        body,
      }),
      invalidatesTags: [tagTypes.Job],
    }),

    updateJob: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/jobs/${id}`,
        method: 'PATCH',
        body,
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.Job, id },
        { type: tagTypes.Job, id: 'LIST' },
      ],
    }),

    deleteJob: builder.mutation<void, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.Job],
    }),
  }),
});

export const {
  useGetAllJobQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApi;
