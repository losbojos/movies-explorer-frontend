import React from 'react';
import { GITHUB_HREF } from '../../utils/consts';

import './footer.css';
import './footer__title.css';
import './footer__line.css';
import './footer__company.css';
import './footer__link.css';
import './footer__copyright.css';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <hr className="footer__line"></hr>
            <p className="footer__company">Яндекс.Практикум</p>
            <a className="footer__link" href={GITHUB_HREF}>Github</a>
            <p className="footer__copyright">&copy; 2023 &#128330;</p>
        </footer>
    );
}

export default Footer;