import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import getSession from '../features/users/apis/getSession';

const AuthPrivateRouter: React.FC = () => {
    const [isAuthStatus, setIsAuthStatus] = useState<number>(-1)

    const getSessionAPI = getSession()

    useEffect(() => {
        getSessionAPI().then(res => {
            res.result ? setIsAuthStatus(1) : setIsAuthStatus(0);
        }).catch(() => {
            setIsAuthStatus(0);
        })
    }, [])
    
    return isAuthStatus === -1 ? <></> : isAuthStatus === 1 ? <Outlet /> : <Navigate to="/get-started" />;
};

export default AuthPrivateRouter;
