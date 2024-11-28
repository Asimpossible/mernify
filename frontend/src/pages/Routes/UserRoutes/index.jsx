import React from 'react'
import { Route } from 'react-router-dom'
import { Cart, ConfirmOrder, Details, ForgotPassword, Home, MyOrders, Login, PaymentMethod, Profile, Register, ResetPassword, Shipping, UpdatePassword, UpdateProfile, UploadAvatar, OrderDetails, Invoice } from '../../../pages';
import { ProtectedRoute } from '../../../components';

const UserRoutes = () => {
    return (
        <>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<Details />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/password/forgot' element={<ForgotPassword />} />
            <Route path='/password/reset/:token' element={<ResetPassword />} />

            <Route path='/me/profile' element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />

            <Route path='/me/update_profile' element={
                <ProtectedRoute>
                    <UpdateProfile />
                </ProtectedRoute>
            } />

            <Route path='/me/upload_avatar' element={
                <ProtectedRoute>
                    <UploadAvatar />
                </ProtectedRoute>
            } />

            <Route path='/me/update_password' element={
                <ProtectedRoute>
                    <UpdatePassword />
                </ProtectedRoute>
            } />

            <Route path='/cart' element={<Cart />} />
            <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
            <Route path='/confirm_order' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
            <Route path='/payment_method' element={
                <ProtectedRoute>
                    <PaymentMethod />
                </ProtectedRoute>
            } />
            <Route path='/me/orders' element={
                <ProtectedRoute>
                    <MyOrders />
                </ProtectedRoute>
            } />

            <Route path='/me/orders/:id' element={
                <ProtectedRoute>
                    <OrderDetails />
                </ProtectedRoute>
            } />

            <Route path='/invoice/orders/:id' element={
                <ProtectedRoute>
                    <Invoice />
                </ProtectedRoute>
            } />
        </>
    )
}

export default UserRoutes
