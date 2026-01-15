import type { Article } from "../../types/article.js";
import { fetchArticlesRaw } from "./articles.raw.js";
import { withRetry } from "./retry.js";
import { getCachedArticles, setCachedArticles } from "./cache.js";

export async function fetchArticles(): Promise<Article[]> {
  try {
    const articles = await withRetry(fetchArticlesRaw, 2);

    setCachedArticles(articles);

    return articles;
  } catch (error) {
    const cached = getCachedArticles();

    if (cached) {
      console.warn("Serving stale articles due to GraphQL failure");
      return cached;
    }

    throw error;
  }
}
