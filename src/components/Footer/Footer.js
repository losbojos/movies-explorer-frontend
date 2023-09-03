import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom'

import { HREFS } from '../../utils/consts';
import { PAGES } from '../../utils/consts';

import './footer.css';
import './footer__text.css';
import './footer__text_title.css';
import './footer__text_link.css';
import './footer__text_copyright.css';
import './footer__container.css';
import './footer__link-container.css';

function Footer() {

    const locationPath = useLocation().pathname;

    const showFooter =
        locationPath === PAGES.MAIN ||
        locationPath === PAGES.MOVIES ||
        locationPath === PAGES.SAVED_MOVIES;

    return (
        <Fragment>
            {showFooter && (
                <footer className="footer">
                    <h2 className="footer__text footer__text_title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
                    <div className="footer__container">
                        <div className="footer__link-container">
                            <a className="footer__text footer__text_link" href={HREFS.YANDEX_PRACTICUM} target="_blank">Яндекс.Практикум</a>
                            <a className="footer__text footer__text_link" href={HREFS.GITHUB} target="_blank">Github</a>
                        </div >
                        <p className="footer__text footer__text_copyright">&copy; 2023 &#128330;</p>
                    </div>
                </footer >
            )}
        </Fragment>
    );
}

export default Footer;