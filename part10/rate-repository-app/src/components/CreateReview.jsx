import { Formik } from 'formik'
import CreateReviewForm from './CreateReviewForm'
import * as yup from 'yup'
import useCreateReview from '../hooks/useCreateReview'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-native'
import { Alert } from 'react-native'

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating is a required number between 0 and 100')
    .max(100, 'Rating is a required number between 0 and 100')
    .required('Rating is required'),
  text: yup.string().max(2000, 'review text maximum 2000 characters'),
})

export const CreateReviewContainer = ({ onSubmit, error, errMsg }) => {
  /*
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
  */
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <CreateReviewForm
          onSubmit={handleSubmit}
          error={error}
          errMsg={errMsg}
        />
      )}
    </Formik>
  )
}

const CreateReview = () => {
  // const [loading, setLoading] = useState(false)
  const [clickBtn, setClickBtn] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const [createReview, result, error] = useCreateReview()
  const navigate = useNavigate()

  //console.log('CreateReview error', error)

  useEffect(() => {
    console.log(' clickBtn error', error)
    console.log(' clickBtn errMsg', errMsg)

    if (clickBtn && error === '') {
      console.log('click btn , error null!!')
      setErrMsg('Invalid ownerName or repositoryName or rating or review')
    }
  }, [clickBtn, error, errMsg])

  useEffect(() => {
    const accessToken = () => {
      Alert.alert(
        'create review information',
        'create review is success, navigate to home page.',
        [
          {
            text: 'Continue',
            onPress: () => {
              //setLoading(false)
              navigate('/')
            },
          },
        ]
      )
    }

    if (result.data) {
      setClickBtn(false)
      accessToken()
    }
  }, [result.data])

  const onSubmit = async (values) => {
    console.log('onSubmit values', values)

    const { ownerName, repositoryName, rating, text } = values
    try {
      setErrMsg('')
      setClickBtn(true)
      await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      })

      setClickBtn(false)

      // setLoading(true)
      setErrMsg('')
    } catch (e) {
      setClickBtn(false)
      console.log('onSubmit error', e)
    }
  }

  return (
    <CreateReviewContainer onSubmit={onSubmit} error={error} errMsg={errMsg} />
  )
}

export default CreateReview
