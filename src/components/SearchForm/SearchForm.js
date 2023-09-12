import React, { useEffect } from 'react';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import ErrorSpan from '../ErrorSpan/ErrorSpan';
import { ERRORS } from '../../utils/consts';

import './search-form.css';
import './search-form__input.css';
import './search-form__submit.css';
import './search-form__input-container.css';
import './search-form__error.css';

function SearchForm({ searchPlaceholder, buttonSubmitText = 'Поиск', handleSearch, initialSearchString, onSearchStringChanged = null }) {

    const searchStringInput = 'searchString';

    const { values, handleChange, errors, isValid } = useFormAndValidation(
        {
            [searchStringInput]: initialSearchString
        },
        false);

    useEffect(() => {
        if (onSearchStringChanged !== null) {
            onSearchStringChanged(values[searchStringInput]);
        }
    }, [values]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch({ searchString: values[searchStringInput] });
    }

    const preprocessHandleChange = (e) => {

        const value = e.target.value;
        const pattern = e.target.pattern;

        if (!value.match(pattern)) {
            e.target.setCustomValidity(ERRORS.EMPTY_SEARCH_STRING_ERROR);
        } else {
            e.target.setCustomValidity("");
        }

        handleChange(e);
    }

    return (
        <form className='search-form' onSubmit={handleSubmit} noValidate>
            <div className='search-form__input-container'>
                <input
                    id={searchStringInput}
                    className='search-form__input'
                    type="text"
                    required
                    placeholder={searchPlaceholder}
                    name={searchStringInput}
                    value={values[searchStringInput] || ''}
                    onChange={preprocessHandleChange}
                    pattern='.*\S.*' /* Должен быть хотя бы 1 непустой символ */
                />
                <ErrorSpan errors={errors[searchStringInput]} addStyles='search-form__error' />
            </div>

            <button
                className="search-form__submit"
                disabled={!isValid}
                type="submit"
            >
                {buttonSubmitText}
            </button>
        </form >
    );

}

export default SearchForm;