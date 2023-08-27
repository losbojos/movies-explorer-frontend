import React, { useContext } from 'react';
import "./moviecard.css";
import './moviecard__header.css';
import './moviecard__name.css';
import './moviecard__name_likedview.css';
import './moviecard__duration.css';
import './moviecard__duration_likedview.css';
import './moviecard__image.css';
import './moviecard__button.css';
import './moviecard__button_save.css';
import './moviecard__button_remove-from-all.css';
import './moviecard__button_remove-from-liked.css';

function MovieCard(props) {

    const { movie, likedMoviesView } = props;
    const { duration, image, nameRU, saved } = movie;

    const altValue = `карточка фильма ${nameRU} `;
    const ariaLabel = saved ? 'Убрать из избранных' : 'Сохранить в избранные';
    const buttonClasses = `moviecard__button ${likedMoviesView ? 'moviecard__button_remove-from-liked' : saved ? 'moviecard__button_remove-from-all' : 'moviecard__button_save'}`
    const titleClasses = `moviecard__name ${likedMoviesView ? 'moviecard__name_likedview' : ''}`;
    const spanClasses = `moviecard__duration  ${likedMoviesView ? 'moviecard__duration_likedview' : ''}`;

    return (
        <article className="moviecard">
            <div className="moviecard__header">
                <h3 className={titleClasses}>{nameRU}</h3>
                <span className={spanClasses}>{duration}</span>
            </div >
            <img
                className="moviecard__image"
                src={image}
                alt={altValue}
            />
            <button
                className={buttonClasses}
                aria-label={ariaLabel}
                type="button"
            >{(!saved && !likedMoviesView) ? 'Сохранить' : ''}
            </button>
        </article >
    );
}

export default MovieCard;