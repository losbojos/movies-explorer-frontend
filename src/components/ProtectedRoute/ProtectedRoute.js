import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { PAGES } from '../../utils/consts';
import { AuthorizationContext } from '../../contexts/AuthorizationContext'

export const ProtectedRoute = ({ element: Component, ...props }) => {
    const { authorizationContext } = useContext(AuthorizationContext);
    return authorizationContext.loggedIn ? <Component {...props} /> : <Navigate to={PAGES.MAIN} replace />
}