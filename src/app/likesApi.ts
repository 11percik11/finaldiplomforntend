import { Like } from "./types"
import { api } from "./api"

export const likesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    likeProduct: builder.mutation<Like, { productId: string }>({
      query: (body) => ({
        url: "/likes",
        method: "POST",
        body,
      }),
    }),
    unlikeProduct: builder.mutation<void, { id: string }>({
      query: (productId) => ({
        url: `/likes`,
        method: "DELETE",
        body: productId
      }),
    }),
    deletelikeProduct: builder.mutation<void, { id: string }>({
      query: (productId) => ({
        url: `/deletelikeProduct`,
        method: "DELETE",
        body: productId
      }),
    }),
  }),
})

export const { useLikeProductMutation, useUnlikeProductMutation, useDeletelikeProductMutation } = likesApi

export const {
  endpoints: { likeProduct, unlikeProduct, deletelikeProduct },
} = likesApi