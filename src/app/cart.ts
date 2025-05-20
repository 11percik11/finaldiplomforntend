import { Cart} from "./types"; // Предполагается, что Cart и CartItem определены в types.ts
import { api } from "./api"; // Импортируем основной экземпляр API

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Получение корзины пользователя
    getCart: builder.query<Cart, void>({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
    }),
    
    // Добавление товара в корзину
    addToCart: builder.mutation<Cart, { productId: string }>({
      query: (data) => ({
        url: "/cart",
        method: "PUT",
        body: data,
      }),
    }),

    // Удаление товара из корзины
    removeFromCart: builder.mutation<Cart, { productId: string }>({
      query: (data) => ({
        url: "/cart",
        method: "DELETE",
        body: data,
      }),
    }),
    updateQuantity: builder.mutation<Cart, { productId: string; action: 'increment' | 'decrement' }>({
  query: ({ productId, action }) => ({
    url: '/cart/update-quantity',
    method: 'PUT',
    body: { productId, action },
  }),
}),

  }),
});

export const {
  useGetCartQuery,
  useLazyGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateQuantityMutation,
} = cartApi;

export const {
  endpoints: {
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity,
  },
} = cartApi;
