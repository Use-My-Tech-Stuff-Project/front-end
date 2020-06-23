import * as Yup from 'yup'


const formSchema = Yup.object().shape({

    name: Yup
      .string()
      .min(2, "Name must be at least 2 characters long."),
    email: Yup
      .string()
      .email("Must be a valid email address"),  


    username: Yup
      .string()
      .min(3,"Username must be at least 3 characters long")
      .required("Username is required"),

    password: Yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters  One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
      
      

    terms: Yup
      .boolean()
      .oneOf([true], "Must Accept Term and Conditions"),
    

      

  })
  
  export default formSchema