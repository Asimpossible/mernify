import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ProtectedRoute } from '../../../components';
import { Dashboard } from '../../Admin/Dashboard';
import ListProducts from '../../Admin/ListProducts';
import NewProduct from '../../Admin/NewProduct';
import UpdateProduct from '../../Admin/UpdateProduct';
import UploadImages from '../../Admin/UploadImages';

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
        </>
    )
}

export default AdminRoutes
