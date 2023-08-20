import React, { Fragment } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchMovies from '../SearchMovies/SearchMovies';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './movies.css';


function Movies(props) {

    const {
        cards, // Массив карточек
    } = props;

    const handleSearch = (str) => {
        console.log(`Search ${str} ...`);
    }

    return (
        <Fragment>
            <Header />
            <section className='movies'>
                <SearchMovies handleSearch={handleSearch} />
                <MoviesCardList cards={cards} />
            </section>
            <Footer />
        </Fragment>
    );
}

export default Movies;