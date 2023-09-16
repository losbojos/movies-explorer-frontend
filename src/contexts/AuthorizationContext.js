import React, { createContext, useState } from 'react';

const AuthorizationContext = createContext();

function AuthorizationContextProvider({ children }) {

    const [authorizationContext, setAuthorizationContext] = useState(
        { loggedIn: false, token: null }
    );

    return (
        <AuthorizationContext.Provider value={{ authorizationContext, setAuthorizationContext }}>
            {children}
        </AuthorizationContext.Provider>
    );
}

export { AuthorizationContext, AuthorizationContextProvider };
