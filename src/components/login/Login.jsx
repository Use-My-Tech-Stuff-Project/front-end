import React, { useState, useEffect } from 'react';
import {useHistory, Link} from "react-router-dom";
import * as Yup from 'yup';
import './loginStyles.css';
import {axiosWithAuth} from "../../utils/axiosWithAuth";


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'

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

let passonoff = true;

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
    const passwordChange = evt => {
        let on = document.getElementById('on');
        let off = document.getElementById('off');
        let pass = document.getElementById('pass');
        if(passonoff === true ){
            passonoff = false;
            off.classList.remove('visible');
            on.className = 'visible';
            pass.type = 'text';
        }
        else{
            passonoff = true;
            on.classList.remove('visible');
            off.className = 'visible';
            pass.type = 'password'
        }
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
            <h2>Log In</h2>
            <p>Don't have an account? <Link to = '/signup'>Sign up</Link></p>
            <form onSubmit = {onSubmit}>
                <div className = 'text'>
                    <label>
                        <TextField
                            name = 'user'
                            value = {formValues.user}
                            type = 'text'
                            onChange = {onInputChange}
                            placeholder = "Username"
                            fullWidth
                            variant = 'filled'
                            size = 'medium'
                            InputProps = {{
                                startAdornment: (
                                    <InputAdornment position = 'start'>
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </label>
                   <div className = 'error'><p>{formErrors.user}</p></div>
                </div>
                <div className = 'text'>
                    <label>
                        <TextField
                            id = 'pass'
                            name = 'password'
                            value = {formValues.password}
                            type = 'password'
                            onChange = {onInputChange}
                            placeholder = "Password"
                            fullWidth
                            variant = 'filled'
                            size = 'medium'
                            InputProps = {{
                                startAdornment: (
                                    <InputAdornment position = 'start'>
                                        <VpnKeyIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position = 'end'>
                                        <div onClick = {passwordChange}>
                                            <div  id = 'on'>
                                             <VisibilityOffIcon />
                                            </div>
                                            <div id = 'off' className = 'visible'>
                                              <VisibilityIcon />
                                            </div>
                                        </div>
                                    </InputAdornment>
                                )
                            }}
                            
                        />
                    </label>
                    <div className = 'error'><p>{formErrors.password}</p></div>
                </div>
                <div className = 'roboCheck'>
                    <FormControlLabel
                        control = {
                            <Checkbox
                                name = 'valid'
                                value = {formValues.valid}
                                type = 'checkbox'
                                onChange = {onCheckBoxChange}
                                size = 'medium'
                                label = 'I am not a Robot'
                            />
                        }
                        label = 'I am not a Robot'
                    />
                    <div className = 'error'><p>{formErrors.valid}</p></div>
                </div>
                <Button variant = 'contained'>Log in</Button>
            </form>
        </div>
    );
}