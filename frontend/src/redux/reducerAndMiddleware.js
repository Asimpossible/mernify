import { authApi } from "./api/Auth";
import { productApi } from "./api/Products";

export const reducer = {
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer
};

export const middlewares = [
    productApi.middleware,
    authApi.middleware
]