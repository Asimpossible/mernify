import { authApi } from "./api/Auth";
import { productApi } from "./api/Products";
import { userApi } from "./api/User";
import userReducer from './features/UserSlice'
import cartReducer from './features/CartSlice'

export const reducer = {
    auth: userReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer
};

export const middlewares = [
    productApi.middleware,
    authApi.middleware,
    userApi.middleware
]