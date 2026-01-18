import type { Article } from "../../types/article.js";
import { createApolloClient } from "../createApolloClient.js";
import { GET_ARTICLES } from "../queries/articles.js";

export async function fetchArticlesRaw(): Promise<Article[]> {
  const client = createApolloClient();

  const { data } = await client.query<{ articles: Article[] }>({
    query: GET_ARTICLES,
    fetchPolicy: "no-cache",
  });

  if (!data?.articles) {
    throw new Error("Invalid GraphQL response: articles missing");
  }

  return data.articles;
}
