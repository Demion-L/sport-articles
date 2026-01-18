import type { Article } from "../../types/article.js";
import { createApolloClient } from "../createApolloClient.js";
import { withRetry } from "./retry.js";
import { getCachedArticle, setCachedArticle } from "./articleCache.js";
import { GET_ARTICLE } from "../queries/articles.js";

export async function fetchArticle(id: string): Promise<Article> {
  try {
    const article = await withRetry(async () => {
      const client = createApolloClient();

      const { data } = await client.query<{ article: Article }>({
        query: GET_ARTICLE,
        variables: { id },
        fetchPolicy: "no-cache",
      });

      if (!data?.article) {
        throw new Error("Article not found");
      }

      return data.article;
    });

    setCachedArticle(article);
    return article;
  } catch (error) {
    const cached = getCachedArticle(id);

    if (cached) {
      console.warn(`Serving stale article ${id}`);
      return cached;
    }

    throw error;
  }
}
