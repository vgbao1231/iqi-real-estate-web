// features/project/projectApi.ts
import { baseApi } from '../api/baseApi';

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<any[], void>({
      query: () => '/projects',
      providesTags: ['Project'],
    }),

    getProjectById: builder.query<any, number | string>({
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
      { id: string | number; tab: string; formData: FormData }
    >({
      query: ({ id, tab, formData }) => ({
        url: `/projects/${id}/${tab}`,
        method: 'PUT',
        body: formData,
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
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectTabMutation, // đổi tên
  useDeleteProjectMutation,
} = projectApi;
