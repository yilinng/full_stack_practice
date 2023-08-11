import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { SIGN_IN } from '../graphqL/mutations'
import { useAuthStorage } from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'

const useSignIn = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  const [error, setError] = useState('')
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      setError(messages)
    },
  })

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data, errors } = await mutate({
      variables: { username, password },
    })

    console.log('use sign in errors', errors)

    console.log('use sign in data', data)

    await authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()
  }

  return [signIn, result, error]
}

export default useSignIn
