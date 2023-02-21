import React from 'react';
import { Navigate, Outlet,useLocation } from 'react-router-dom';
import AuthserviceApi from './authService'


const RequireAuth = () => {
    const auth = AuthserviceApi.getCurrentUser();
    const location = useLocation()
    return (
        auth ?
             <Outlet/>
            :
            <Navigate  to="/loginOrRegister" state={{ from: location }} replace />
    );
}

export default RequireAuth