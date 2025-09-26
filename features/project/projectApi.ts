import { baseApi } from '../api/baseApi';

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===== PUBLIC =====
    getPublicProjects: builder.query<any[], void>({
      query: () => '/projects/public',
      providesTags: ['Project'],
    }),

    getPublicProjectById: builder.query<any, string>({
      query: (id) => `/projects/public/${id}`,
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),

    getPublicProjectTabById: builder.query<any, { id: string; tab: string }>({
      query: ({ id, tab }) => `/projects/public/${id}/${tab}`,
      providesTags: (result, error, { id }) => [{ type: 'Project', id }],
    }),

    // ===== ADMIN =====
    getAdminProjects: builder.query<any[], void>({
      query: () => '/projects',
      providesTags: ['Project'],
    }),

    getAdminProjectById: builder.query<any, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),

    createProject: builder.mutation<any, void>({
      query: () => ({
        url: '/projects',
        method: 'POST',
      }),
      invalidatesTags: ['Project'],
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
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }],
    }),

    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
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
  useDeleteProjectMutation,
} = projectApi;
