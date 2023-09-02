import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import CustomCheckBox from '../CustomCheckBox/CustomCheckBox';
import './search-movies.css';
import './search-movies__checkbox-container.css';

function SearchMovies(props) {

    const { handleSearch, onlyShortFilms = false } = props;

    const [shortFilmsChecked, setShortFilmsChecked] = useState(onlyShortFilms);

    const handleSearchString = (props) => { /* props содержит уже searchString */
        props.onlyShortFilms = shortFilmsChecked;
        handleSearch(props);
    }

    const handleCheckBoxChanged = (newValue) => {
        setShortFilmsChecked(newValue);
    }

    return (
        <section className='search-movies'>
            <SearchForm searchPlaceholder='Фильм' handleSearch={handleSearchString} />
            <div className='search-movies__checkbox-container'>
                <CustomCheckBox
                    caption='Короткометражки'
                    checked={shortFilmsChecked}
                    onChanged={handleCheckBoxChanged}
                />
            </div>
        </section>
    );

}

export default SearchMovies;
