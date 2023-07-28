import { Formik } from 'formik'
import SignInForm from './SignInForm'
import * as yup from 'yup'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'must be at least 3 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(3, 'must be at least 3 characters long')
    .required('Password is required'),
})

const SignIn = () => {
  const onSubmit = (values) => {
    console.log('onSubmit', values)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
