import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
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
            }
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
    })
})

export const { useCreateNewOrderMutation, useStripeCheckoutSessionMutation, useMyOrdersQuery, useOrderDetailsQuery, useLazyGetDashboardSalesQuery } = orderApi