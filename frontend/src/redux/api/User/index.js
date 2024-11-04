import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setUser } from '../../features/UserSlice';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    endpoints: (builder) => ({
        getMe: builder.query({
            query() {
                return {
                    url: "/me",
                    method: "GET"
                }
            },
            transformResponse: (result) => result.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                    dispatch(setIsAuthenticated(false));
                } catch (error) {
                    console.error("Fetching error:", error)
                }
            }
        })
    })
})

export const { useGetMeQuery } = userApi;