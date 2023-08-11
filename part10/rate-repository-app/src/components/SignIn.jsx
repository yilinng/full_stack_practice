import { Formik } from 'formik'
import SignInForm from './SignInForm'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-native'
import { Alert } from 'react-native'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    //.min(3, 'must be at least 3 characters long')
    .required('Username is required'),
  password: yup
    .string()
    //.min(3, 'must be at least 3 characters long')
    .required('Password is required'),
})

export const SignInContainer = ({ onSubmit, error, errMsg }) => {
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
        <SignInForm onSubmit={handleSubmit} error={error} errMsg={errMsg} />
      )}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn, result, error] = useSignIn()
  const [loading, setLoading] = useState(false)
  const [clickBtn, setClickBtn] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  console.log('error sign in', error)

  useEffect(() => {
    if (clickBtn && error === '') {
      console.log('click btn , error null!!')
      setErrMsg('Invalid username or password.')
    }
  }, [clickBtn, error])

  useEffect(() => {
    const accessToken = () => {
      Alert.alert('sign in information', 'sign in success!! navigate page..', [
        {
          text: 'Continue',
          onPress: () => {
            setLoading(false)
            setClickBtn(false)
            navigate('/')
          },
        },
      ])
    }
    if (result.data) {
      accessToken()
    }
  }, [result.data])

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      setErrMsg('')
      setClickBtn(true)
      await signIn({ username, password })

      setLoading(true)
    } catch (e) {
      setLoading(false)
      setClickBtn(false)

      console.log('sign in error', e)
    }
  }

  return (
    <SignInContainer
      onSubmit={onSubmit}
      error={error}
      loading={loading}
      errMsg={errMsg}
    />
  )
}

export default SignIn
