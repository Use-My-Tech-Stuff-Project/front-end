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
      .min(6,"Password must be at least 6 characters long ")
      .required("Password is required"),

    terms: Yup
      .boolean()
      .oneOf([true], "Must Accept Term and Conditions"),
    

      

  })
  
  export default formSchema