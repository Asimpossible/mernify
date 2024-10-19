import { productApi } from "./api/Products";

export const reducer = {
    [productApi.reducerPath]: productApi.reducer
};

export const middlewares = [
    productApi.middleware
]