import react, { Fragment, useState } from 'react';
import './customcheckbox.css';

function CustomCheckBox({ caption, checked, onChanged }) {

    const [checkedValue, setCheckedValue] = useState(checked);

    const handleChange = (e) => {
        const newValue = e.target.checked;
        // console.log(`onChange from ${checkedValue} to ${newValue}`);
        setCheckedValue(newValue);
        onChanged(newValue);
    }

    return (
        <Fragment>
            <input
                className='customcheckbox'
                type='checkbox'
                id="customcheckbox"
                name="customcheckbox"
                checked={checkedValue}
                onChange={handleChange}
            />
            <label htmlFor='customcheckbox'>{caption}</label>
        </Fragment>
    );
}

export default CustomCheckBox;