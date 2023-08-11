import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { CREATE_REVIEW } from '../graphqL/mutations'

const useCreateReview = () => {
  const [error, setError] = useState('')
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      setError(messages)
    },
  })

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    // call the mutate function here with the right arguments
    if (text) {
      await mutate({
        variables: { ownerName, repositoryName, rating, text },
      })
    } else {
      await mutate({
        variables: { ownerName, repositoryName, rating },
      })
    }

    // console.log('data from createReview', data)
  }

  return [createReview, result, error]
}

export default useCreateReview
