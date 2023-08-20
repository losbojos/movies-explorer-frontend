import React, { Fragment } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchMovies from '../SearchMovies/SearchMovies';

import './movies.css';


function Movies(props) {

    const handleSearch = (str) => {
        console.log(`Search ${str} ...`);
    }

    return (
        <Fragment>
            <Header />
            <SearchMovies handleSearch={handleSearch} />
            <Footer />
        </Fragment>
    );
}

export default Movies;