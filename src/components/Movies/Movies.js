import React, { Fragment } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

import './movies.css';


function Movies(props) {

    const handleSearch = (str) => {
        console.log(`Search ${str} ...`);
    }

    return (
        <Fragment>
            <Header />
            <SearchForm searchPlaceholder='Фильм' handleSearch={handleSearch} />
            <Footer />
        </Fragment>
    );
}

export default Movies;