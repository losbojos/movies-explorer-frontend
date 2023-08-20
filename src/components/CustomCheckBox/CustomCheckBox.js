import react, { Fragment } from 'react';
import './customcheckbox.css';

function CustomCheckBox({ caption }) {
    return (
        <Fragment>
            <input
                className='customcheckbox'
                type='checkbox'
                id="customcheckbox"
                name="customcheckbox"
            />
            <label htmlFor='customcheckbox'>{caption}</label>
        </Fragment>
    );
}

export default CustomCheckBox;