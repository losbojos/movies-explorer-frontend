import React from 'react';
import './footer.css';
import { GITHUB_HREF } from '../../utils/consts';

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