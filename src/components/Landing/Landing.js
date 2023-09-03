import React, { Fragment } from 'react';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Landing(props) {
    return (
        <Fragment>
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </Fragment>
    );
}

export default Landing;
