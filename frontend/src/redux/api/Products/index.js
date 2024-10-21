import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
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
            }
        })
    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi;