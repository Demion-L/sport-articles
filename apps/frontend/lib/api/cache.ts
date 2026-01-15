import type { Article } from "../../types/article.js";

let cachedArticles: Article[] | null = null;

export function getCachedArticles() {
  return cachedArticles;
}

export function setCachedArticles(articles: Article[]) {
  cachedArticles = articles;
}
