import React from 'react';
import './aboutme.css';
import myFoto from '../../images/myfoto.png';


function AboutMe(props) {

    return (
        <div className="aboutme">
            <h2 className="aboutme__header">Студент</h2>
            <hr className="aboutme__line"></hr>
            <img className="aboutme__foto" src={myFoto} alt="Фото студента" />
            <h3 className="aboutme__title">Евгений</h3>
            <p className="aboutme__bio">Фронтенд-разработчик, 43 года</p>
            <p className="aboutme__text">Я родился и живу в Новосибирске, закончил факультет прикладной математики и информатики НГТУ. Работал C++\C# разработчиком и менеджером проектов. У меня есть жена и дети. Также увлекаюсь инвестированием в акции. Стало интересно освоить WEB и сменить специализацию. Прошел курс по веб-разработке от Я.Практикум.</p>
            <a className="aboutme__link" href="https://github.com/losbojos">Github</a>
        </div >
    );
}

export default AboutMe;