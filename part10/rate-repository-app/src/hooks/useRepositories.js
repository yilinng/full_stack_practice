import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphqL/queries'

const useRepositories = ({ first, after }) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { first, after },
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
      },
    })
  }

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore(),
    loading,
    error,
  }
}

export default useRepositories
