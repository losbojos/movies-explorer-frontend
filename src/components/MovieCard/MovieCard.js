import React, { useContext } from 'react';
import "./moviecard.css";

function MovieCard(props) {

    const { movie, likedMoviesView } = props;
    const { duration, image, nameRU, saved } = movie;

    const altValue = `карточка фильма ${nameRU} `;
    const ariaLabel = saved ? 'Убрать из избранных' : 'Сохранить в избранные';
    const buttonClasses = `moviecard__button ${likedMoviesView ? 'moviecard__button_remove-from-liked' : saved ? 'moviecard__button_remove-from-all' : 'moviecard__button_save'}`

    return (
        <article className="moviecard">
            <div className="moviecard__header">
                <h3 className="moviecard__name">{nameRU}</h3>
                <span className="moviecard__duration">{duration}</span>
            </div>
            <img
                className="moviecard__image"
                src={image}
                alt={altValue}
            />
            <button
                className={buttonClasses}
                aria-label={ariaLabel}
                type="button"
            >{!saved && 'Сохранить'}
            </button>
        </article >
    );
}

export default MovieCard;