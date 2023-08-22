import React, { Fragment, useState } from 'react';
import './main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Main(props) {

    const [viewMore, setViewMore] = useState(false);

    const handleMore = () => {
        setViewMore(true);
    }

    return (
        <Fragment>
            <Header addHeaderClass='header_bluebackground' />
            <main className="main">
                <Promo showButtonMore={!viewMore} onClickMore={handleMore} />
                {viewMore && (
                    <Fragment>
                        <AboutProject />
                        <Techs />
                        <AboutMe />
                        <Portfolio />
                    </Fragment>
                )}
            </main >
            <Footer />
        </Fragment>
    );
}

export default Main;
