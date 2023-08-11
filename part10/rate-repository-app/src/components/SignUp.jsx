import { useState, useEffect } from 'react'
import { Formik } from 'formik'
import SignUpForm from './SignUpForm'
import * as yup from 'yup'
import useCreateUser from '../hooks/useCreateUser'
import { useNavigate } from 'react-router-native'
import { Alert } from 'react-native'
const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
}
//https://stackoverflow.com/questions/61862252/yup-schema-validation-password-and-confirmpassword-doesnt-work
//https://stackoverflow.com/questions/66510333/how-can-i-confirm-matching-values-in-a-react-form-with-yup-validation
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username is a required string with a length between 5 and 30')
    .max(30, 'Username is a required string with a length between 5 and 30')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Username is a required string with a length between 5 and 50')
    .max(50, 'Username is a required string with a length between 5 and 50')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .required('Password confirm is required')
    .oneOf([yup.ref('password'), null], 'Your password do not match.'),
})

export const SignUpContainer = ({ onSubmit, error, loading, errMsg }) => {
  //  console.log('error', error)

  /*
  if (!error && loading) {
    return (
      <View>
        <ActivityIndicator
          style={{
            ...StyleSheet.absoluteFill,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          size='large'
        />
      </View>
    )
  }
  */
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <SignUpForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          errMsg={errMsg}
        />
      )}
    </Formik>
  )
}

const SignUp = () => {
  const [signUp, result, error] = useCreateUser()
  const [loading, setLoading] = useState(false)
  const [clickBtn, setClickBtn] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (clickBtn && error === '') {
      console.log('click btn , error null!!')
      setErrMsg('Invalid username. Choose another username!!')
    }
  }, [clickBtn, error])

  useEffect(() => {
    const accessToken = () => {
      Alert.alert(
        'sign up information',
        'signup success navigate to sign in page, please sign in.',
        [
          {
            text: 'Continue',
            onPress: () => {
              setLoading(true)
              navigate('/signIn')
            },
          },
        ]
      )
    }
    if (result.data) {
      accessToken()
    }
  }, [result.data])

  const onSubmit = async (values) => {
    console.log('sign in onSubmit values', values)
    const { username, password } = values
    try {
      setErrMsg('')
      setClickBtn(true)
      setLoading(true)
      await signUp({ username, password })
    } catch (e) {
      setLoading(false)
      setClickBtn(false)
      console.log(e)
    }
  }

  return (
    <SignUpContainer
      onSubmit={onSubmit}
      error={error}
      loading={loading}
      errMsg={errMsg}
    />
  )
}

export default SignUp
