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
      return this.getBestAwnser(data.questionSearch.edges[0].node.answers.nodes);
    }
    getBestAwnser(awnsers){
      var bestAwnser;
      for(let i=0;i<awnsers.length;i++){
        const awnserContent = awnsers[i].content.replace(/<[^>]*>?/gm, '')
        if(!bestAwnser){
          awnsers[i].content = awnserContent;
          bestAwnser=awnsers[i];
        }else{
          if(awnsers[i].thanksCount>bestAwnser.thanksCount){
            bestAwnser=awnsers[i];
          }
        }
      }
      if(!bestAwnser){
        return {content: 'Resposta não encontrada', thanksCount: 0}
      }
      return bestAwnser;
    }

  }

module.exports = new Search();