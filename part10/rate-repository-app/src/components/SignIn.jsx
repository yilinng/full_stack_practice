import { Formik } from 'formik'
import SignInForm from './SignInForm'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-native'
import { Alert, View, ActivityIndicator, StyleSheet } from 'react-native'

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

export const SignInContainer = ({ onSubmit, error, loading, errMsg }) => {
  if (!error && !errMsg && loading) {
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
  /*
  when error appear, device show timeout,error and data does not appear.
  replace error with errMsg, you can check result.
  */
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  console.log('result sign in', error)

  useEffect(() => {
    if (clickBtn && error === '') {
      console.log(`click btn, error === ''!!`)
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
            navigate('/')
          },
        },
      ])
    }
    if (result.data) {
      setClickBtn(false)
      setErrMsg('')
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
