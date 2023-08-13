import React from 'react';
import './main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';

function Main(props) {

    return (
        <main className="main">
            <Promo />
            <AboutProject />
        </main >
    );
}

export default Main;
