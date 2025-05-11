import { Product } from "./types";
import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<Product, FormData>({
      query: (productData) => ({
        url: "/product",
        method: "POST",
        body: productData,
      }),
    }),
    getAllProduct: builder.query<any, void>({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation<
      Product,
      { userData: FormData; id: string }
    >({
      query: ({ userData, id }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useLazyGetAllProductQuery,
  useLazyGetProductByIdQuery,
} = productApi;

export const {
  endpoints: {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProductById,
    updateProduct,
  },
} = productApi;
