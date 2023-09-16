import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import { AuthorizationContextProvider } from './contexts/AuthorizationContext';
import { CurrentUserContextProvider } from './contexts/CurrentUserContext';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <StrictMode>

  <AuthorizationContextProvider>
    <CurrentUserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CurrentUserContextProvider>
  </AuthorizationContextProvider>

  // </StrictMode>
);