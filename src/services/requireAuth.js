import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthserviceApi from './authService'


const RequireAuth = () => {
    const auth = AuthserviceApi.getCurrentUser();
    return (
        auth ?
             <Outlet/>
            :
            <Navigate to = "/"/>
    );
}

export default RequireAuth