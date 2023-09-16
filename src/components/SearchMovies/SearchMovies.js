import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import CustomCheckBox from '../CustomCheckBox/CustomCheckBox';
import './search-movies.css';
import './search-movies__checkbox-container.css';

function SearchMovies(props) {

    const { handleSearch, filterOptions, setFilterOptions } = props;

    const [cachedSearchString, setCachedSearchString] = useState(filterOptions.searchString);
    // Закешируемое значение строки поиска из инпута, на случай если нажмут чек-бокс Короткометражки, а не Поиск

    const preprocessSearch = (options) => { /* options уже должен содержать поле searchString */
        options.onlyShortFilms = filterOptions.onlyShortFilms; // Добавим поле
        handleSearch(options);
    }

    const handleCheckBoxChanged = (newValue) => {
        setFilterOptions({ searchString: cachedSearchString, onlyShortFilms: newValue });
    }

    const onSearchStringChanged = (newValue) => {
        setCachedSearchString(newValue);
    }

    return (
        <section className='search-movies'>
            <SearchForm
                searchPlaceholder='Фильм'
                handleSearch={preprocessSearch}
                initialSearchString={filterOptions.searchString}
                onSearchStringChanged={onSearchStringChanged}
            />
            <div className='search-movies__checkbox-container'>
                <CustomCheckBox
                    caption='Короткометражки'
                    checked={filterOptions.onlyShortFilms}
                    onChanged={handleCheckBoxChanged}
                />
            </div>
        </section>
    );

}

export default SearchMovies;
