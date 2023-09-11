import React from 'react';
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
        onlyLikedView = false, // Это окно любимых фильмов?
        isLoadingMovies, // Состояние процесса загрузки фильмов (актуально только для окна всех фильмов)
        loadMoviesError, // Сообщение об ошибке запроса фильмов (актуально только для окна всех фильмов)
        filterOptions, // опции фильтрации
        setFilterOptions, // установщик опций фильтрации
        handleToggleLike, // Обработчик переключения лайка (добавить\удалить сохраненные)
    } = props;

    const handleMore = () => {

    }

    return (
        <section className='movies'>
            <SearchMovies handleSearch={handleSearch} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
            <div className="movies__data-section">
                {isLoadingMovies && (<Preloader />)}
                {loadMoviesError && (<ErrorSpan errors={loadMoviesError} addStyles='movies__error-span' />)}
                <MoviesCardList movies={movies} onlyLikedView={onlyLikedView} handleToggleLike={handleToggleLike} />
            </div>
            <div className="movies__footer">
                {!onlyLikedView && (
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