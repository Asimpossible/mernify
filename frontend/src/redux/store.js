import { configureStore } from '@reduxjs/toolkit'
import { middlewares, reducer } from './reducerAndMiddleware.js'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
})

setupListeners(store.dispatch)