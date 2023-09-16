import React from 'react';
import { Link } from 'react-router-dom'

import { PAGES } from '../../utils/consts';

import './logo.css';

function Logo() {

    return (
        <Link className="logo" to={PAGES.MAIN} aria-label="Главная" />
    );
}

export default Logo;