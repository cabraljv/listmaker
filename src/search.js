const {GraphQLClient, gql} = require('graphql-request');
const brainlyAPI = "https://brainly.com.br/graphql/pt";

const graphQLClient = new GraphQLClient(brainlyAPI);

class Search{
  constructor(){

  }
  async searchQuestion(question){
    const query = gql`
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
      `;
      const variables = {
        query: question,
        first: 10,
        after: null,
      }
      const data = await graphQLClient.request(query, variables);
      this.getBestAwnser(data.questionSearch.edges[0].node.answers.nodes);
    }
    getBestAwnser(awnsers){
      var bestAwnser;
      awnsers.forEach(awnser=>{
        const awnserContent = awnser.content.replace(/<[^>]*>?/gm, '')
        if(!bestAwnser){
          bestAwnser=awnser;
        }else{
          if(awnser.thanksCount>bestAwnser.thanksCount){
            bestAwnser=awnser;
          }
        }
      })
      if(!bestAwnser){
        return {content: 'Resposta não encontrada', thanksCount: 0}
      }
      return bestAwnser;
    }

  }

module.exports = new Search();