import React from 'react';

import LandingSection from '../LandingSection/LandingSection';

import './about-project.css';
import './about-project__header.css';
import './about-project__article-header.css';
import './about-project__list.css';
import './about-project__item.css';
import './about-project__text.css';
import './about-project__roadmap.css';
import './about-project__roadmap-list.css';
import './about-project__roadmap-list-item.css';
import './about-project__roadmap-content.css';
import './about-project__roadmap-content_diagram.css';
import './about-project__roadmap-content_diagram_highlighted.css';
import './about-project__roadmap-content_text.css';

function AboutProject(props) {

    return (
        <LandingSection innerSectionClass="about-project" id="about-project-section">
            <h2 className="about-project__header">О проекте</h2>
            <ul className="about-project__list">
                <li className="about-project__item">
                    <article>
                        <h3 className="about-project__article-header">Дипломный проект включал 5 этапов</h3>
                        <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </article>

                </li>
                <li className="about-project__item">
                    <article>
                        <h3 className="about-project__article-header">На выполнение диплома ушло 5 недель</h3>
                        <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </article>
                </li>
            </ul>
            <div className="about-project__roadmap">
                <ul className="about-project__roadmap-list">
                    <li className="about-project__roadmap-list-item">
                        <p className="about-project__roadmap-content about-project__roadmap-content_diagram about-project__roadmap-content_diagram_highlighted">1 неделя</p>
                    </li>
                    <li className="about-project__roadmap-list-item">
                        <p className="about-project__roadmap-content about-project__roadmap-content_diagram">4 недели</p>
                    </li>
                    <li className="about-project__roadmap-list-item">
                        <p className="about-project__roadmap-content about-project__roadmap-content_text">Back-end</p>
                    </li>
                    <li className="about-project__roadmap-list-item">
                        <p className="about-project__roadmap-content about-project__roadmap-content_text">Front-end</p>
                    </li>
                </ul>
            </div>
        </LandingSection>
    );
}

export default AboutProject;