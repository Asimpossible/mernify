import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setLoading, setUser } from '../../features/UserSlice';

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['User'],
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
                    dispatch(setLoading(false));
                } catch (error) {
                    dispatch(setLoading(false));
                    console.error("Fetching error:", error)
                }
            },
            providesTags: ['User']
        }),
        updateProfile: builder.mutation({
            query(body) {
                return {
                    url: '/me/update',
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ['User']
        })
    })
})

export const { useGetMeQuery, useUpdateProfileMutation } = userApi;