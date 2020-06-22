import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

import LoginSchema from './LoginSchema';

const initalValues = {
    user: '',
    password: '',
    valid: false,
};
const initalFormErrors = {
    user: '',
    password: '',
    valid: false,
}

export default function Login() {
    const [ formValues, setFormValues ] = useState(initalValues);
    const [ formErrors, setFormErrors ] = useState(initalFormErrors);

    const onInputChange = evt => {
        const { name, value } = evt.target;

        Yup
            .reach(LoginSchema, name)
            .validate(value)
            .then(() => {
                setFormErrors({...formErrors, [name]: ''});
            })
            .catch(error => {
                setFormErrors({...formErrors, [name]: error.errors[0]})
            })

        setFormValues({...formValues, [name]: value});
    }
    const onCheckBoxChange = evt => {
        const { name, checked } = evt.target;
        
        Yup
        .reach(LoginSchema, name)
        .validate(checked)
        .then(() => {
            setFormErrors({...formErrors, [name]: ''});
        })
        .catch(error => {
            setFormErrors({...formErrors, [name]: error.errors[0]})
        })

        setFormValues({...formValues, [name]: checked});
    }
    const onSubmit = evt => {
        evt.preventDefault();

        
    }

    return(
        <div>
            <h3>Log In</h3>
            <p>Don't have an account? <a href = ''>Sign up</a></p>
            <form onSubmit = {onSubmit}>
                <div className = 'errors'>
                    <div>{formErrors.user}</div>
                    <div>{formErrors.password}</div>
                    <div>{formErrors.valid}</div>
                </div>
                <label>Username:
                    <input
                        name = 'user'
                        value = {formValues.user}
                        type = 'text'
                        onChange = {onInputChange}
                    />
                </label>
                <label>Password:
                    <input
                        name = 'password'
                        value = {formValues.password}
                        type = 'text'
                        onChange = {onInputChange}
                    />
                </label>
                <label>
                    <input
                        name = 'valid'
                        value = {formValues.valid}
                        type = 'checkbox'
                        onChange = {onCheckBoxChange}
                    />
                I am not a Robot</label>
                <button>Log in</button>
            </form>
        </div>
    );
}