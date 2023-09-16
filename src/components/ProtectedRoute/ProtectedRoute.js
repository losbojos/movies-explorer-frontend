import React from 'react';
import { Navigate } from 'react-router-dom';
import { PAGES } from '../../utils/consts';

export const ProtectedRoute = ({ element: Component, checkValue, ...props }) => {
    return checkValue ? <Component {...props} /> : <Navigate to={PAGES.MAIN} replace />
}