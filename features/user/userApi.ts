import { baseApi, tagTypes } from '../api/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<any[], void>({
      query: () => '/users',
      providesTags: (result) =>
        result
          ? [
              { type: tagTypes.User, id: 'LIST' },
              ...result.map((user) => ({ type: tagTypes.User, id: user.id })),
            ]
          : [{ type: tagTypes.User, id: 'LIST' }],
    }),

    getUserById: builder.query<any, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: tagTypes.User, id }],
    }),

    createUser: builder.mutation<any, any>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [tagTypes.User],
    }),

    updateUser: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.User, id },
        { type: tagTypes.User, id: 'LIST' },
      ],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.User],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
