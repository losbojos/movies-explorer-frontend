import React from 'react';
import './logo.css';
import { PAGES } from '../../utils/consts';

function Logo() {

    return (
        <a className="logo" href={PAGES.MAIN} aria-label="Главная" />
    );
}

export default Logo;