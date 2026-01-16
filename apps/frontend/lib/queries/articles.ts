import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query Articles($limit: Int!, $cursor: ID) {
    articles(limit: $limit, cursor: $cursor) {
      items {
        id
        title
        content
      }
      nextCursor
    }
  }
`;

export const GET_ARTICLE = gql`
  query Article($id: ID!) {
    article(id: $id) {
      id
      title
      content
      createdAt
      imageUrl
    }
  }
`;

export const CREATE = gql`
  mutation Create($input: ArticleInput!) {
    createArticle(input: $input) {
      id
      title
      content
      createdAt
    }
  }
`;

export const UPDATE = gql`
  mutation Update($id: ID!, $input: ArticleInput!) {
    updateArticle(id: $id, input: $input) {
      id
      title
      content
    }
  }
`;

export const DELETE = gql`
  mutation Delete($id: ID!) {
    deleteArticle(id: $id)
  }
`;
