import { Comment } from "./types"
import { api } from "./api"

export const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<Comment, { id: string; text: string }>({
      query: ({ id, text }) => ({
        url: `/comments/${id}`,
        method: 'POST',
        body: { text }, // Если нужно передавать дополнительные поля, добавьте их здесь
      }),
    }),
    deleteComment: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/comments/${id}`,
        method: "DELETE"
      }),
    }),
    deleteAdminComment: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/deleteAdminComment/${id}`,
        method: "DELETE"
      }),
    }),
    updateComment: builder.mutation<Comment, { id: string; text: string }>({
      query: ({ id, text }) => ({
        url: `/comments/${id}`,
        method: "PUT",
        body: { text },
      }),
    }),
    allComment: builder.mutation<Comment[], { productid: string}>({
      query: ({ productid }) => ({
        url: `/${productid}/comments`,
        method: "GET",
      }),
    }),
  }),
})

export const { 
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useDeleteAdminCommentMutation,
    useUpdateCommentMutation,
    useAllCommentMutation,
    } = commentsApi

export const {
  endpoints: { createComment, deleteComment, deleteAdminComment, updateComment, allComment },
} = commentsApi