import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import * as Yup from 'yup';
import './loginStyles.css';
import {axiosWithAuth} from "../../utils/axiosWithAuth";

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

export default function Login(props) {
    const { setUser } = props;
    const [ formValues, setFormValues ] = useState(initalValues);
    const [ formErrors, setFormErrors ] = useState(initalFormErrors);
    const history = useHistory();
    const { push } = history;

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
        axiosWithAuth()
            .post("/api/login", {username: formValues.user, password: formValues.password})
                .then(res => {
                    console.log(res.data)
                    window.localStorage.setItem("token", res.data.token);
                    setUser(res.data)
                    push(`/ownerpage`)
                })
                .catch(err => console.log(err));
    }

    return(
        <div className = 'login'>
            <h3>Log In</h3>
            <p>Don't have an account? <a href = ''>Sign up</a></p>
            <form onSubmit = {onSubmit}>
                <div className = 'text'>
                    <label>
                        <input
                            name = 'user'
                            value = {formValues.user}
                            type = 'text'
                            onChange = {onInputChange}
                            placeholder = "Username"
                            size = '30'
                        />
                    </label>
                   <div className = 'error'><p>{formErrors.user}</p></div>
                </div>
                <div className = 'text'>
                    <label className = 'text'>
                        <input
                            name = 'password'
                            value = {formValues.password}
                            type = 'text'
                            onChange = {onInputChange}
                            placeholder = "Password"
                            size = '30'
                        />
                    </label>
                    <div className = 'error'><p>{formErrors.password}</p></div>
                </div>
                <label>
                    <input
                        name = 'valid'
                        value = {formValues.valid}
                        type = 'checkbox'
                        onChange = {onCheckBoxChange}
                    />
                I am not a Robot</label>
                <div className = 'error'><p>{formErrors.valid}</p></div>
                <button>Log in</button>
            </form>
        </div>
    );
}