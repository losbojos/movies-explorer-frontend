import React from 'react';

import LandingSection from '../LandingSection/LandingSection';

import './techs-background.css';
import './techs.css';
import './techs__header.css';
import './techs__title.css';
import './techs__text.css';
import './techs__list.css';
import './techs__item.css';

function Techs(props) {

    return (
        <LandingSection outerSectionClass="techs-background" innerSectionClass="techs">
            <h2 className="techs__header">Технологии</h2>
            <h3 className="techs__title">7 технологий</h3>
            <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="techs__list">
                <li className="techs__item">HTML</li>
                <li className="techs__item">CSS</li>
                <li className="techs__item">JS</li>
                <li className="techs__item">React</li>
                <li className="techs__item">Git</li>
                <li className="techs__item">Express.js</li>
                <li className="techs__item">mongoDB</li>
            </ul>
        </LandingSection>
    );
}

export default Techs;