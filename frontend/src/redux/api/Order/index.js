import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
    tagTypes: ["Order", "AdminOrders"],
    endpoints: (builder) => ({
        createNewOrder: builder.mutation({
            query(body) {
                return {
                    url: "orders/new",
                    method: "POST",
                    body
                }
            }
        }),
        myOrders: builder.query({
            query() {
                return {
                    url: "me/orders",
                    method: "GET"
                }
            }
        }),
        orderDetails: builder.query({
            query(id) {
                return {
                    url: `orders/${id}`,
                    method: "GET"
                }
            },
            providesTags: ["Order"]
        }),
        stripeCheckoutSession: builder.mutation({
            query(body) {
                return {
                    url: "payment/checkout_session",
                    method: "POST",
                    body
                }
            }
        }),
        getDashboardSales: builder.query({
            query({ startDate, endDate }) {
                return {
                    url: `admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
                    method: "GET"
                }
            }
        }),
        getAdminOrders: builder.query({
            query() {
                return {
                    url: "admin/orders",
                    method: "GET",
                }
            },
            providesTags: ["AdminOrders"],
        }),
        updateOrder: builder.mutation({
            query({ body, id }) {
                return {
                    url: `/admin/orders/${id}`,
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ["Order"],
        }),
        deleteOrder: builder.mutation({
            query(id) {
                return {
                    url: `/admin/orders/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["AdminOrders"],
        })
    })
})

export const { useCreateNewOrderMutation, useStripeCheckoutSessionMutation, useMyOrdersQuery,
    useOrderDetailsQuery, useLazyGetDashboardSalesQuery, useGetAdminOrdersQuery, useUpdateOrderMutation, useDeleteOrderMutation } = orderApi