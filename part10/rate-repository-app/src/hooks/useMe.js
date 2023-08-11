import { useQuery } from '@apollo/client'

import { GET_ME } from '../graphqL/queries'

const useMe = () => {
  const { data, error, loading } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  })

  return { me: data?.me, loading, error }
}

export default useMe
