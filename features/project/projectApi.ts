import { baseApi, tagTypes } from '../api/baseApi';

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===== PUBLIC =====
    getPublicProjects: builder.query<any[], void>({
      query: () => '/projects/public',
      providesTags: [tagTypes.Project],
    }),

    getPublicProjectById: builder.query<any, string>({
      query: (id) => `/projects/public/${id}`,
      providesTags: (result, error, id) => [{ type: tagTypes.Project, id }],
    }),

    getPublicProjectTabById: builder.query<any, { id: string; tab: string }>({
      query: ({ id, tab }) => `/projects/public/${id}/${tab}`,
      providesTags: (result, error, { id }) => [{ type: tagTypes.Project, id }],
    }),

    // ===== ADMIN =====
    getAdminProjects: builder.query<any[], void>({
      query: () => '/projects',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: tagTypes.Project,
                id,
              })),
              { type: tagTypes.Project, id: 'LIST' },
            ]
          : [{ type: tagTypes.Project, id: 'LIST' }],
    }),

    getAdminProjectById: builder.query<any, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: tagTypes.Project, id }],
    }),

    createProject: builder.mutation<any, void>({
      query: () => ({
        url: '/projects',
        method: 'POST',
      }),
      invalidatesTags: [tagTypes.Project],
    }),

    updateProjectTab: builder.mutation<
      any,
      { id: string; tab: string; body: any }
    >({
      query: ({ id, tab, body }) => ({
        url: `/projects/${id}/${tab}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.Project, id },
      ],
    }),

    updateProjectScalarData: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/projects/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.Project, id },
      ],
    }),

    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.Project],
    }),
  }),
});

export const {
  useGetPublicProjectsQuery,
  useGetPublicProjectByIdQuery,
  useGetPublicProjectTabByIdQuery,
  useGetAdminProjectsQuery,
  useGetAdminProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectTabMutation,
  useUpdateProjectScalarDataMutation,
  useDeleteProjectMutation,
} = projectApi;
