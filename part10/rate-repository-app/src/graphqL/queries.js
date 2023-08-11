import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query repositories($first: Int, $after: String) {
    repositories(first: $first, after: $after) {
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
      totalCount
      edges {
        node {
          description
          language
          fullName
          name
          ownerName
          watchersCount
          userHasReviewed
          url
          stargazersCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
          openIssuesCount
          id
          createdAt
          forksCount
        }
      }
    }
  }
`

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`

export const GET_REPOSITORY = gql`
  query repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      ownerAvatarUrl
      description
      language
      forksCount
      watchersCount
      stargazersCount
      reviewCount
      ratingAverage
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`

export const SEARCH_KEYWORD = gql`
  query repositories($searchKeyword: String) {
    repositories(searchKeyword: $searchKeyword) {
      edges {
        node {
          description
          language
          fullName
          name
          ownerName
          watchersCount
          userHasReviewed
          url
          stargazersCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
          openIssuesCount
          id
          createdAt
          forksCount
        }
      }
    }
  }
`

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repository {
              fullName
            }
          }
        }
      }
    }
  }
`

// other queries...
