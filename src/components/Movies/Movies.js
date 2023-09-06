import React, { useState } from 'react';
import SearchMovies from '../SearchMovies/SearchMovies';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import ErrorSpan from '../ErrorSpan/ErrorSpan';

import './movies.css';
import './movies__button-more.css';
import './movies__footer.css';
import './movies__error-span.css';
import './movies__data-section.css';

function Movies(props) {

    const {
        movies, // Массив фильмов
        handleSearch, // Обработчик поиска с параметрами { searchString, onlyShortFilms } должен возвращать Promise
        likedMovies = false, // Это окно любимых фильмов?
        isLoadingMovies, // Состояние процесса загрузки фильмов (актуально только для окна всех фильмов)
        loadMoviesError, // Сообщение об ошибке запроса фильмов
    } = props;

    const handleMore = () => {

    }

    return (
        <section className='movies'>
            <SearchMovies handleSearch={handleSearch} />
            <div className="movies__data-section">
                {isLoadingMovies && (<Preloader />)}
                {loadMoviesError && (<ErrorSpan errors={loadMoviesError} addStyles='movies__error-span' />)}
                <MoviesCardList movies={movies} likedMovies={likedMovies} />
            </div>
            <div className="movies__footer">
                {!likedMovies && (
                    <button
                        className='movies__button-more'
                        type='button'
                        aria-label='Показать больше фильмов'
                        onClick={handleMore}
                    >
                        Ещё
                    </button>
                )}
            </div>
        </section>
    );
}

export default Movies;