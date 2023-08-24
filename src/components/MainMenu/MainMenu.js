import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './main-menu.css';

function MainMenu({ isLandingPage = false }) {
    return (
        <nav className="main-menu">
            <Navigation type='horizontal' isLandingPage={isLandingPage} />
            <BurgerMenu />
        </nav>
    );

}

export default MainMenu;
