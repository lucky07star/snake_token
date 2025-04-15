import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import getMe from '../features/users/apis/getMe';

const AuthPrivateRouter: React.FC = () => {
    const [isAuthStatus, setIsAuthStatus] = useState<number>(-1)

    const getMeAPI = getMe()

    useEffect(() => {
        getMeAPI().then(() => {
            setIsAuthStatus(1);
        }).catch(() => {
            setIsAuthStatus(0);
        })
    }, [])
    
    return isAuthStatus === -1 ? <></> : isAuthStatus === 1 ? <Outlet /> : <Navigate to="/" />;
};

export default AuthPrivateRouter;
