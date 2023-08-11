import { useQuery } from '@apollo/client'

import { SEARCH_KEYWORD } from '../graphqL/queries'

export const useSearchKeyword = ({ searchKeyword }) => {
  const { data, error, loading } = useQuery(SEARCH_KEYWORD, {
    variables: { searchKeyword },
    skip: !searchKeyword,
    fetchPolicy: 'cache-and-network',
  })

  //console.log('error', error)

  //console.log('data', data)

  return {
    data,
    loading,
    error,
  }
}
