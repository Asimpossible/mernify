import { configureStore } from '@reduxjs/toolkit'
import { middlewares, reducer } from './reducerAndMiddleware.js'
export const store = configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
})