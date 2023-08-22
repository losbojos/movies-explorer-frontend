import React, { Fragment } from 'react';
import './main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Main(props) {

    return (
        <Fragment>
            <Header addHeaderClass='header_bluebackground' />
            <main className="main">
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main >
            <Footer />
        </Fragment>
    );
}

export default Main;
