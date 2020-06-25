import React from 'react'
import {useState, useEffect} from 'react'
import {TextField , Button, FormControl} from '@material-ui/core'
import * as Yup from 'yup';
import formSchema from '../validation/SignupSchema'
import LockIcon from '@material-ui/icons/Lock'
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'





const initailFormValues = {
    firstname:'',
    lastname:'',
    email: '',
    phone: '',
    username:'',
    address: '',
    password:'',
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
    ShowPassword: false
  }


  const initailUsers = []


export default function SignUp () {

    const [formValues , setFormValues] = useState(initailFormValues)
    const [formErrors , setFormErrors] = useState(initailFormErrors)
    const [users , setUsers] = useState(initailUsers)
    const history = useHistory()
    const {push} = history

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

    const getUsers = () =>{
     axios.get('https://usemytechstuffapp.herokuapp.com')
        .then(response =>{
            setUsers(response.data)
        })
        .catch( err=>{
            debugger
        })
    }

    useEffect(()=>{
        getUsers()
    },[])
    
    const postNewUser = () =>{
        axios.post('https://usemytechstuffapp.herokuapp.com/api/register',{
            firstname: formValues.firstname,
            lastname:formValues.lastname,
            email: formValues.email,
            phone: formValues.phone,
            username:formValues.username,
            address: formValues.address,
            password:formValues.password
         })
        .then(response =>{
            setUsers([...users, response.data])
        })
        .catch(err =>{
            debugger
        })
        .finally(()=>{
            setFormValues(initailFormValues)
        })
    }
    

    const onSubmit = evt =>{
        evt.preventDefault()
        postNewUser(formValues)
        push('/login')
    }


    
      const handleClickShowPassword = () => {
        setFormValues({ ...formValues, showPassword: !formValues.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const makeStyles = () =>{

        return {
            signup:{
                padding: '2%',
                height: '70%',
                background:'ivory',
                display:'flex',
                justifyContent:'center',
            },
            container:{
                width: '30%',
                padding: '2%',
               
                
            },
            div:{
                display:'flex',
                // flexDirection:'column',
                justifyContent:'center',  
            },
            input:{
                margin: '2%',   
            },
            icon:{
                fontSize:'30',
                paddingLeft: '15%'
            }, 
            div2:{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                paddingLeft: '40%'

            }
        }

    }
 
 
    return (
      
        <form style={makeStyles().signup} onSubmit={onSubmit} >
        <div >
          <div style={makeStyles().div2}> 
            <h1 className='text' >Sign up</h1>
            <LockIcon style={makeStyles().icon}/>
            <h2 className='text' > * Indicates a required field</h2>
           </div>
            <div style={makeStyles().div} >
                <div  style={makeStyles().container}className='bigContainer'>
                    <label>
                        <TextField
                        style={makeStyles().input}
                        type='text'
                        name='firstname'
                        value={formValues.firstname}
                        onChange={onInputChange}
                        helperText={formErrors.firstname}
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
                        helperText={formErrors.lastname}
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
                    <Link to='/login' className='text'>Already have an Account?.... Click here to Login!</Link>
              
                </div>
            </div>
            <div className='btn'>
                <Button type='submit' 
                variant='contained'
                > Sign Up  </Button>

            </div>
            </div>                
        </form>
      
    )
}

