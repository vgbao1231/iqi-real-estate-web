// features/upload/uploadApi.ts
import { baseApi } from '../api/baseApi';

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<
      { url: string; publicId: string },
      { file: File; folder?: string }
    >({
      query: ({ file, folder }) => {
        const formData = new FormData();
        formData.append('file', file);
        if (folder) formData.append('folder', folder);

        return {
          url: '/upload/image',
          method: 'POST',
          body: formData,
        };
      },
    }),

    deleteImage: builder.mutation<{ message: string }, { publicId: string }>({
      query: ({ publicId }) => ({
        url: `/upload/image`,
        method: 'DELETE',
        body: { publicId },
      }),
    }),
  }),
});

export const { useUploadImageMutation, useDeleteImageMutation } = uploadApi;
