import { baseApi, tagTypes } from '../api/baseApi';

export const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===== PUBLIC =====
    getPublicArticles: builder.query<any, void>({
      query: () => '/articles/public',
      providesTags: [tagTypes.Article],
    }),

    getPublicArticleById: builder.query<any, string>({
      query: (id) => `/articles/public/${id}`,
      providesTags: (result, error, id) => [{ type: tagTypes.Article, id }],
    }),

    // ===== ADMIN =====
    getAdminArticles: builder.query<any[], void>({
      query: () => '/articles',
      providesTags: (result) =>
        result
          ? [
              { type: tagTypes.Article, id: 'LIST' },
              ...result.map((user) => ({
                type: tagTypes.Article,
                id: user.id,
              })),
            ]
          : [{ type: tagTypes.Article, id: 'LIST' }],
    }),

    getAdminArticleById: builder.query<any, string>({
      query: (id) => `/articles/${id}`,
      providesTags: (result, error, id) => [{ type: tagTypes.Article, id }],
    }),

    createArticle: builder.mutation<any, any>({
      query: (body) => ({
        url: '/articles',
        method: 'POST',
        body,
      }),
      invalidatesTags: [tagTypes.Article],
    }),

    updateArticle: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/articles/${id}`,
        method: 'PATCH',
        body,
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.Article, id },
        { type: tagTypes.Article, id: 'LIST' },
      ],
    }),

    deleteArticle: builder.mutation<void, string>({
      query: (id) => ({
        url: `/articles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.Article],
    }),
  }),
});

export const {
  useGetPublicArticlesQuery,
  useGetPublicArticleByIdQuery,

  useGetAdminArticlesQuery,
  useGetAdminArticleByIdQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
