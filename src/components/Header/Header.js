import React, { useContext } from 'react';
import Logo from '../Logo/Logo';
import GuestMenu from '../GuestMenu/GuestMenu';
import MainMenu from '../MainMenu/MainMenu';
import { AuthorizationContext } from '../../contexts/AuthorizationContext'

import './header.css';
import './header_landing.css';

function Header({ isLandingPage = false }) {

    const authorizationContext = useContext(AuthorizationContext);

    const headerClasses = `header ${isLandingPage ? 'header_landing' : ''}`;

    return (
        <header className={headerClasses}>
            <Logo />
            {authorizationContext.loggedIn ? (<MainMenu isLandingPage={isLandingPage} />) : (<GuestMenu />)}
        </header>
    );
}

export default Header;