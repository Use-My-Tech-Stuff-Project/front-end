import * as Yup from 'yup'


const formSchema = Yup.object().shape({

    firstname: Yup
      .string()
      .min(2, "Name must be at least 2 characters long."),
      
    lastname: Yup
    .string()
    .min(2, "Name must be at least 2 characters long."),

    address: Yup
    .string()
    .required("Address is required"),

    email: Yup
      .string()
      .email("Must be a valid email address"),  


    username: Yup
      .string()
      .min(3,"Username must be at least 3 characters long")
      .max(32, "Username can not be longer than 32 characters long")
      .required("Username is required"),

    phone: Yup
      .string()
      .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Must be a valid phone number"
      ),
      

    password: Yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})/,
        "Must Contain 7 Characters  One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
      
      

    terms: Yup
      .boolean()
      .oneOf([true], "Must Accept Term and Conditions"),
    

      

  })
  
  export default formSchema