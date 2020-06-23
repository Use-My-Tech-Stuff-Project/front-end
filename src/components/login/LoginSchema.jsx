import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    user: Yup.string().min(1, "Please enter Username").required("Please enter Username"),
    password: Yup.string().min(1, "Please enter Password").required("Please enter Password"),
    valid: Yup.boolean().oneOf([true], "Please click checkbox to continue."),
})

export default LoginSchema;