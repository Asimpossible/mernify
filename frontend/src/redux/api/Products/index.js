import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query(params) {
                return {
                    url: "products",
                    method: "GET",
                    params: {
                        page: params?.page,
                        keyword: params?.keyword,
                        category: params?.category,
                        "price[gte]": params.min,
                        "price[lte]": params.max,
                        "ratings[gte]": params.ratings
                    },
                }
            }
        }),
        getProductDetails: builder.query({
            query(id) {
                return {
                    url: `products/${id}`,
                    method: "GET"
                }
            },
            providesTags: ["Product"]
        }),
        submitReview: builder.mutation({
            query(body) {
                return {
                    url: "/reviews",
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ["Product"]
        }),
        canUserReview: builder.query({
            query(productId) {
                return {
                    url: `/can_review/?productId=${productId}`,
                    method: "GET",
                }
            },
        })
    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery, useSubmitReviewMutation, useCanUserReviewQuery } = productApi;