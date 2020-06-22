import React from 'react'
import {useState} from 'react'
import Button from '@material-ui/core/Button'
import * as Yup from 'yup';
import formSchema from '../validation/SignupSchema'




const initailFormValues = {
    name:'',
    email: '',
    username:'',
    password:'',
    terms: false,
  } 

  const initailFormErrors = {
    name:'',
    email: '',
    username:'',
    password:'',
    terms: false,
  }


export default function SignUp () {

    const [formValues , setFormValues] = useState(initailFormValues)
    const [formErrors , setFormErrors] = useState(initailFormErrors)

    const onCheckboxChange = evt => {
        const { name, checked } = evt.target
       
        setFormValues({
          ...formValues,
            [name]: checked,
          })
      }


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

 
 
    return (
        <form onSubmit={onSubmit}>
            <div className='errors'>
            <div id='errorName'>{formErrors.name}</div>
            <div id='errorSpecail' >{formErrors.email}</div>
            <div id='errorSauce' >{formErrors.username}</div>
            <div id='errorSauce' >{formErrors.password}</div>
            <div id='errorSauce' >{formErrors.terms}</div>

            </div>
            <div className='bigContainer'>
                <h1>Create an Account</h1>
                <label> Name 
                    <input
                    type='text'
                    name='name'
                    value={formValues.name}
                    onChange={onInputChange}
                    />
                </label>
                <label> Email
                    <input
                    type='email'
                    name='email'
                    value={formValues.email}
                    onChange={onInputChange}
                    />
                </label>
                <label> Username
                    <input
                    type='text'
                    name='username'
                    value={formValues.username}
                    onChange={onInputChange}
                    />
                </label>
                <label> Password
                    <input
                    type='text'
                    name='password'
                    value={formValues.password}
                    onChange={onInputChange}
                    />
                </label>
                <label> Terms of Service
                    <input
                    type='checkbox'
                    name='terms'
                    value={formValues.terms}
                    onChange={onCheckboxChange}
                    />
                </label>  
            </div>
            <div className='btn'>
                <Button color="primary"> Submit </Button>

            </div>

        </form>
    )
}

