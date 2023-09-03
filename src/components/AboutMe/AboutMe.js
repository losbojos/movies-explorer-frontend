import React from 'react';
import myFoto from '../../images/myfoto.png';
import { HREFS } from '../../utils/consts';

import './about-me.css';
import './about-me__data-section.css';
import './about-me__text-data-section.css';
import './about-me__header.css';
import './about-me__foto.css';
import './about-me__title.css';
import './about-me__bio.css';
import './about-me__text.css';
import './about-me__link.css';

function AboutMe(props) {

    return (
        <section className="about-me">
            <h2 className="about-me__header">Студент</h2>
            <div className="about-me__data-section">
                <img className="about-me__foto" src={myFoto} alt="Фото студента" />
                <div className="about-me__text-data-section">
                    <h3 className="about-me__title">Евгений</h3>
                    <p className="about-me__bio">Фронтенд-разработчик, 43 года</p>
                    <p className="about-me__text">Я родился и живу в Новосибирске, закончил факультет прикладной математики и информатики НГТУ. Ранее работал C++\C# разработчиком, а также менеджером проектов. У меня есть жена и трое детей. Увлекаюсь рынком акций. Стало интересно освоить WEB и сменить специализацию. Прошёл курс по веб-разработке от Я.Практикум.</p>
                    <a className="about-me__link" href={HREFS.GITHUB} target="_blank">Github</a>
                </div>
            </div>
        </section >
    );
}

export default AboutMe;