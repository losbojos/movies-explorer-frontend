import React, { useContext, Fragment } from 'react';
import { useLocation } from 'react-router-dom'

import Logo from '../Logo/Logo';
import GuestMenu from '../GuestMenu/GuestMenu';
import MainMenu from '../MainMenu/MainMenu';
import { AuthorizationContext } from '../../contexts/AuthorizationContext'
import { PAGES } from '../../utils/consts';

import './header.css';
import './header_landing.css';
import './header__container.css';

function Header() {

    const locationPath = useLocation().pathname;
    const showHeader =
        locationPath === PAGES.MAIN ||
        locationPath === PAGES.MOVIES ||
        locationPath === PAGES.SAVED_MOVIES ||
        locationPath === PAGES.PROFILE;

    const isLandingPage = locationPath === PAGES.MAIN;

    const { authorizationContext } = useContext(AuthorizationContext);

    const headerClasses = `header ${isLandingPage ? 'header_landing' : ''}`;

    return (
        <Fragment>
            {showHeader && (
                <header className={headerClasses}>
                    <div className="header__container">
                        <Logo />
                        {authorizationContext.loggedIn ? (<MainMenu isLandingPage={isLandingPage} />) : (<GuestMenu />)}
                    </div>
                </header>
            )}
        </Fragment>
    );
}

export default Header;