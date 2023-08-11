//import { useMutation } from '@apollo/client'
//import { useState } from 'react'
//import { SIGN_IN } from '../graphql/mutations'
import { useAuthStorage } from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'

const useSignIn = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  //const [error, setError] = useState('')
  /*
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      setError(messages)
    },
  })
  */
  const signOut = async () => {
    // call the mutate function here with the right arguments
    // const { data } = await mutate({ variables: { username, password } })
    // console.log('data from sign in', data)
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
  }

  return [signOut]
}

export default useSignIn
