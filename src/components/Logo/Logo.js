import React from 'react';
import './logo.css';
import logoImage from '../../images/logo.svg';

function Logo() {
    return (
        <img className="logo" src={logoImage} alt="логотип" />
    );
}

export default Logo;