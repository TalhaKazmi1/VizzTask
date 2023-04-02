import React from 'react'
import {useLocation, Outlet, Navigate} from 'react-router-dom'
import { useLocalStorage } from '../Shared/hooks/useLocalStorage'

const PrivateRoutes = () => {
    const location = useLocation()
    const { getUserAsync } = useLocalStorage()
  return getUserAsync ? <Outlet /> : <Navigate to="/Login" replace state={{ from: location }} />
}

export default PrivateRoutes