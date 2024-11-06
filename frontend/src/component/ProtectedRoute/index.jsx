import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Loading } from '..'

const Index = ({ children }) => {

    const { isAuthenticated, loading } = useSelector((state) => state.auth)
    if (loading) <Loading />

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />
    }
    return children;
}

export default Index
