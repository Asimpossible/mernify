import { configureStore } from '@reduxjs/toolkit'
import { middlewares, reducer } from './reducerAndMiddleware.js'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer,
    devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === 'DEVELOPMENT',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
})

setupListeners(store.dispatch)