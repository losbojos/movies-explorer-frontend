import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './moviescardlist.css';

function MoviesCardList(props) {

    const {
        cards, // Массив карточек
    } = props;

    return (
        <ul className="moviescardlist">
            {
                cards.map(card => {
                    return (
                        <li className="moviescardlist__listitem" key={card._id}>
                            <MovieCard {...card} />
                        </li>
                    );
                })
            }
        </ul >

    );
}

export default MoviesCardList;

