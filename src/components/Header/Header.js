import React from 'react';
import Logo from '../Logo/Logo';
import GuestMenu from '../GuestMenu/GuestMenu';
import MainMenu from '../MainMenu/MainMenu';

import './header.css';
import './header_landing.css';

function Header({ isLandingPage = false }) {

    //const isLogged = false;
    const isLogged = true;

    const headerClasses = `header ${isLandingPage ? 'header_landing' : ''}`;

    return (
        <header className={headerClasses}>
            <Logo />
            {isLogged ? (<MainMenu isLandingPage={isLandingPage} />) : (<GuestMenu />)}
        </header>
    );
}

export default Header;