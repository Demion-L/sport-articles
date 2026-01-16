import { gql } from "graphql-tag";

export const typeDefs = gql`
  type SportsArticle {
    id: ID!
    title: String!
    content: String!
    createdAt: String
    deletedAt: String
    imageUrl: String
  }

  input ArticleInput {
    title: String!
    content: String!
    imageUrl: String
  }

  type ArticleConnection {
  items: [SportsArticle!]!
  nextCursor: ID
}

  type Query {
    articles(limit: Int!, cursor: ID): ArticleConnection!
    article(id: ID!): SportsArticle
  }

  type Mutation {
    createArticle(input: ArticleInput!): SportsArticle!
    updateArticle(id: ID!, input: ArticleInput!): SportsArticle!
    deleteArticle(id: ID!): Boolean!
  }
`;
