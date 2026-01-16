import usePaginatedArticles from "../lib/hooks/useArticles.js";


export default function ArticleList() {
  const { articles, loading, loadMore, hasMore } = usePaginatedArticles(10);

  return (
    <>
      {articles.map((a) => (
        <div key={a.id}>{a.title}</div>
      ))}

      {hasMore && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </>
  );
}
