import { useQuery } from '@apollo/client'

import { GET_REPOSITORY } from '../graphqL/queries'

export const useRepository = ({ repositoryId, first, after }) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId, first, after },
    skip: !repositoryId,
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
      },
    })
  }

  console.log('error', error)

  console.log('data', data)

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore(),
    loading,
    error,
  }
}

//export default useRepository
