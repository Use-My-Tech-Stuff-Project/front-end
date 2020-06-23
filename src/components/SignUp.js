import React from 'react'
import {useState} from 'react'
import {Button, TextField, Checkbox} from '@material-ui/core'
import * as Yup from 'yup';
import formSchema from '../validation/SignupSchema'
import LockIcon from '@material-ui/icons/Lock'
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';




const initailFormValues = {
    firstname:'',
    lastname:'',
    email: '',
    phone: '',
    username:'',
    address: '',
    password:'',
    terms: false,
    showPassword: false,
  } 

  const initailFormErrors = {
    firstName:'',
    lastName:'',
    email: '',
    phone:'',
    username:'',
    address: '',
    password:'',
    terms: false,
    ShowPassword: false
  }

  const initialDisabled = true 


export default function SignUp () {

    const [formValues , setFormValues] = useState(initailFormValues)
    const [formErrors , setFormErrors] = useState(initailFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled) 


      const onInputChange = evt =>{
        const {name , value} = evt.target

        Yup
        .reach(formSchema,name)
        .validate(value)
        .then(()=>{
            setFormErrors({
                ...formErrors,
                [name]:''
            });
        })
        .catch(err =>{
            setFormErrors({
                ...formErrors,
                [name]: err.errors[0] 
            })
        })

        setFormValues({
          ...formValues,
          [name]:value,
          
        })
      
      } 



    const onSubmit = evt =>{
        evt.preventDefault()
    }



    const onCheckboxChange = evt => {
        const { name, checked } = evt.target
       
        setFormValues({
          ...formValues,
            [name]: checked,
          })
      }



    formSchema.isValid(formValues).then(valid=>{
        setDisabled(!valid);
    },[formValues])

    
      const handleClickShowPassword = () => {
        setFormValues({ ...formValues, showPassword: !formValues.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const makeStyles = () =>{

        return {
            container:{
                width: '50%',
                display:'flex',
                flexDirection: 'column',
            },
            div:{
                display:'flex',
                justifyContent:'center'
            },
            input:{
                margin: '2%',
            }
        }

    }
 
 
    return (
        <form onSubmit={onSubmit}>
            <h1>Sign up</h1>
            <p> * Indicates a required field</p>
            <LockIcon style={{fontSize: 30}}/>
            <div style={makeStyles().div} >
                <div  style={makeStyles().container}className='bigContainer'>
                    <label>
                        <TextField
                        style={makeStyles().input}
                        type='text'
                        name='firstname'
                        value={formValues.firstname}
                        onChange={onInputChange}
                        helperText={formErrors.name}
                        variant='filled'
                        placeholder='First Name'
                        fullWidth = {true}
                        />
                    </label>
                    <label>
                        <TextField
                        style={makeStyles().input}
                        type='text'
                        name='lastname'
                        value={formValues.lastname}
                        onChange={onInputChange}
                        helperText={formErrors.name}
                        variant='filled'
                        placeholder='Last Name'
                        fullWidth = {true}
                        />
                    </label>
                    <label>

                        <TextField
                        style={makeStyles().input}
                        type='email'
                        name='email'
                        value={formValues.email}
                        onChange={onInputChange}
                        helperText={formErrors.email}
                        variant='filled'
                        placeholder="Email"
                        fullWidth = {true}
                        />
                    </label>
                    <label>
                        <TextField
                        style={makeStyles().input}
                        type='text'
                        name='phone'
                        value={formValues.phone}
                        onChange={onInputChange}
                        helperText={formErrors.phone}
                        variant='filled'
                        placeholder='Phone Number'
                        fullWidth = {true}
                        />
                    </label>
                    <label>
                        <TextField
                        style={makeStyles().input}
                        type='text'
                        name='address'
                        value={formValues.address}
                        onChange={onInputChange}
                        helperText={formErrors.address}
                        variant='filled'
                        placeholder='Address'
                        fullWidth = {true}
                        />
                    </label>
                    <label>
                        <TextField
                        style={makeStyles().input}
                        type='text'
                        name='username'
                        value={formValues.username}
                        onChange={onInputChange}
                        helperText={formErrors.username}
                        variant='filled'
                        placeholder='Username *'
                        fullWidth = {true}
                        />
                    </label>
                        <FilledInput
                        placeholder='Password *'
                        style={makeStyles().input}
                        type={formValues.showPassword ? 'text' : 'password'}
                        name='password'
                        value={formValues.password}
                        onChange={onInputChange}
                        fullWidth = {true}
                        endAdornment={
                            <InputAdornment position='end'>
                            <IconButton
                            aria-label='toggle passowrd visibility'
                            onClick={handleClickShowPassword}
                            onMouse={handleMouseDownPassword}
                            edge='end'
                            >
                            {formValues.showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                            </InputAdornment>
                            }
                        labelWidth={70}
                        />
                         <FormHelperText id="outlined-helper-text">{formErrors.password}</FormHelperText>
                    <label> Terms of Service
                        <Checkbox
                        type='checkbox'
                        name='terms'
                        value={formValues.terms}
                        onChange={onCheckboxChange}
                        helperText={formErrors.terms}
                        />
                    </label>  
                </div>
            </div>
            <div className='btn'>
                <Button  disabled={disabled}> Submit </Button>

            </div>

        </form>
    )
}

