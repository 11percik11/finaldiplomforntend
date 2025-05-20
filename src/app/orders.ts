import { api } from "./api";
import { Order } from "./types";

export const orderApi = api.injectEndpoints({
  endpoints: builder => ({
    // ✅ Создание заказа
    createOrder: builder.mutation<Order, { items: { productId: string; quantity: number }[] }>({
      query: orderData => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),

    // 🧾 Получение заказов текущего пользователя
    getMyOrders: builder.query<Order[], void>({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),

    // 🔍 Получение одного заказа по ID
    getOrderById: builder.query<Order, string>({
      query: id => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
    }),

    // 🗑 Удаление заказа
    deleteOrder: builder.mutation<{ message: string; orderId: string }, string>({
      query: id => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
    }),

    // 🛠️ Только для админа: все заказы
    getAllOrders: builder.query<Order[], void>({
      query: () => ({
        url: "/admin/orders",
        method: "GET",
      }),
    }),

    // 🔍 Только для админа: заказы по userId
    getOrdersByUserId: builder.query<Order[], string>({
      query: userId => ({
        url: `/orders/user/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useGetOrdersByUserIdQuery,
  useLazyGetMyOrdersQuery,
} = orderApi;

export const {
  endpoints: {
    createOrder,
    getMyOrders,
    getOrderById,
    deleteOrder,
    getAllOrders,
    getOrdersByUserId,
  },
} = orderApi;
