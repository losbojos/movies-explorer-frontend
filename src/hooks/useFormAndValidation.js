import { useState, useCallback } from 'react';

export default function useFormAndValidation(inputValues = {}, initialIsValid = true) {
    const [values, setValues] = useState(inputValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(initialIsValid);

    const handleChange = (e) => {
        const { name, value, validationMessage } = e.target
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: validationMessage });
        setIsValid(e.target.closest('form').checkValidity());
    };

    const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
    }, [setValues, setErrors, setIsValid]);

    return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}