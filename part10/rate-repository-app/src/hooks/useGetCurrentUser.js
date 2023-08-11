import { useQuery } from '@apollo/client'

import { GET_CURRENT_USER } from '../graphqL/queries'

export const useGetCurrentUser = ({ includeReviews }) => {
  const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  })

  console.log('error', error)

  console.log('data', data)

  return {
    data,
    loading,
    error,
    refetch,
  }
}

//export default useRepository
