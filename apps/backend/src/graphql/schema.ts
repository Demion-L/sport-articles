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

  type Query {
    articles: [SportsArticle!]!
  }
`;
