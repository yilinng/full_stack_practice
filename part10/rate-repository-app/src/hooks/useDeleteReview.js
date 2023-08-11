import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { DELETE_REVIEW } from '../graphqL/mutations'

const useDeleteReview = () => {
  const [error, setError] = useState('')
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      setError(messages)
    },
  })

  const deleteReview = async ({ deleteReviewId }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({
      variables: { deleteReviewId },
    })
    console.log('data from deleteReview', data)
  }

  return [deleteReview, result, error]
}

export default useDeleteReview
