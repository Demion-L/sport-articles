export type Article = {
  id: string;
  title: string;
  content?: string;
};

export type ArticlesProps = {
  articles: Article[];
};

export type PagesRouter = { push: (url: string) => Promise<boolean> | void };

export type ArticlesQuery = { articles: { items: Article[]; nextCursor?: string } };

export interface UsePaginatedArticlesResult {
  articles: Article[];
  loading: boolean;
  error?: Error | null;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  retry: () => Promise<void>;
  retryCount: number;
}
