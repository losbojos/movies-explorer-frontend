import react, { Fragment, useState } from 'react';
import './custom-checkbox.css';

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
                className='custom-checkbox'
                type='checkbox'
                id="custom-checkbox"
                name="custom-checkbox"
                checked={checkedValue}
                onChange={handleChange}
            />
            <label htmlFor='custom-checkbox'>{caption}</label>
        </Fragment>
    );
}

export default CustomCheckBox;