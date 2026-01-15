import type { Article } from "../../types/article.js";

const articleCache = new Map<string, Article>();

export function getCachedArticle(id: string): Article | undefined {
  return articleCache.get(id);
}

export function setCachedArticle(article: Article): void {
  articleCache.set(article.id, article);
}

