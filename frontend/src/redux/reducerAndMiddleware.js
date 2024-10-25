import { authApi } from "./api/Auth";
import { productApi } from "./api/Products";
import { userApi } from "./api/User";
import userReducer from './features/UserSlice'

export const reducer = {

    auth: userReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer
};

export const middlewares = [
    productApi.middleware,
    authApi.middleware,
    userApi.middleware
]