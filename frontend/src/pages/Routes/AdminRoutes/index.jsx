import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ProtectedRoute } from '../../../components';
import { Dashboard, ListOrders, ListProducts, NewProduct, ProcessOrder, UpdateProduct, UploadImages, ListUsers, UpdateUser, ProductReviews } from '../..';


const AdminRoutes = () => {
    const { user } = useSelector((state) => state.auth)

    return (
        <>
            <Route path='/admin/dashboard' element={
                <ProtectedRoute admin={true}>
                    <Dashboard />
                </ProtectedRoute>
            } />

            <Route path='/admin/products' element={
                <ProtectedRoute admin={true}>
                    <ListProducts />
                </ProtectedRoute>
            } />

            <Route path='/admin/product/new' element={
                <ProtectedRoute admin={true}>
                    <NewProduct />
                </ProtectedRoute>
            } />

            <Route path='/admin/products/:id' element={
                <ProtectedRoute admin={true}>
                    <UpdateProduct />
                </ProtectedRoute>
            } />

            <Route path='/admin/products/:id/upload_images' element={
                <ProtectedRoute admin={true}>
                    <UploadImages />
                </ProtectedRoute>
            } />

            <Route path='/admin/orders' element={
                <ProtectedRoute admin={true}>
                    <ListOrders />
                </ProtectedRoute>
            } />

            <Route path='/admin/orders/:id' element={
                <ProtectedRoute admin={true}>
                    <ProcessOrder />
                </ProtectedRoute>
            } />

            <Route path='/admin/users' element={
                <ProtectedRoute admin={true}>
                    <ListUsers />
                </ProtectedRoute>
            } />

            <Route path='/admin/users/:id' element={
                <ProtectedRoute admin={true}>
                    <UpdateUser />
                </ProtectedRoute>
            } />

            <Route path='/admin/reviews' element={
                <ProtectedRoute admin={true}>
                    <ProductReviews />
                </ProtectedRoute>
            } />

        </>
    )
}

export default AdminRoutes
