
  
# Graphql API
>Graphql API na lingua portuguesa https://brainly.com.br/graphql/pt

Query utilizada
```graphql
query SearchQuery($query: String!, $first: Int!, $after: ID) {
  questionSearch(query: $query, first: $first, after: $after) {
    count
    edges {
      node {
        id
        databaseId
        author {
          id
          databaseId
          isDeleted
          nick
          avatar {
            thumbnailUrl
            __typename
          }
          rank {
            name
            __typename
          }
          __typename
        }
        content
        answers {
          nodes {
            thanksCount
            ratesCount
            rating
            __typename
            content
          }
          hasVerified
          __typename
        }
        __typename
      }
      highlight {
        contentFragments
        __typename
      }
      __typename
    }
    __typename
  }
}

```