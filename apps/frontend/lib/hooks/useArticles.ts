import { useCallback, useRef } from "react";

import { GET_ARTICLES } from "../queries/articles.js";
import type { Article, ArticlesQuery, UsePaginatedArticlesResult } from "../../types/article.js";
import { useQuery } from "@apollo/client/react";

export default function usePaginatedArticles(
  limit = 10
): UsePaginatedArticlesResult {
  const retryCountRef = useRef(0);
  
  const { data, loading, error, fetchMore, refetch } = useQuery<ArticlesQuery>(GET_ARTICLES, {
    variables: { limit },
    notifyOnNetworkStatusChange: true,
  });

  const articles = data?.articles.items ?? [];
  const nextCursor = data?.articles.nextCursor;

  const normalizedError: Error | null = error ? (error as unknown as Error) : null;

  const loadMore = useCallback(async () => {
    if (!nextCursor) return Promise.resolve();

    await fetchMore({
      variables: {
        cursor: nextCursor,
      },
    });
    return undefined;
  }, [fetchMore, nextCursor]);

  const retry = useCallback(async () => {
    retryCountRef.current += 1;
    await refetch();
  }, [refetch]);

  return {
    articles,
    loading,
    error: normalizedError,
    loadMore,
    hasMore: Boolean(nextCursor),
    retry,
    retryCount: retryCountRef.current,
  };
}
