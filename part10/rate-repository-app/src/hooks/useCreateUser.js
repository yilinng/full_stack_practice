import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_USER } from '../graphqL/mutations'
//import { useAuthStorage } from '../hooks/useAuthStorage'
//import { useApolloClient } from '@apollo/client'

const useCreateUser = () => {
  // const apolloClient = useApolloClient()
  // const authStorage = useAuthStorage()
  const [error, setError] = useState('')
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      setError(messages)
    },
  })

  const signUp = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data, errors } = await mutate({ variables: { username, password } })
    console.log('data from sign up', data, errors)
    // await authStorage.setAccessToken(data.authenticate.accessToken)
    // apolloClient.resetStore()
  }

  return [signUp, result, error]
}

export default useCreateUser
