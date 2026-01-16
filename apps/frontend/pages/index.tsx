import type { GetServerSideProps } from "next";
import Link from "next/link";
import ArticleList from "../components/ArticleList.js";
import type { ArticlesProps, Article } from "../types/article.js";
import { createApolloClient } from "../lib/apollo.js";
import { GET_ARTICLES } from "../lib/queries/articles.js";

export default function IndexPage({ articles }: ArticlesProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sports Articles</h1>

      <Link
        href="/article/create"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Create Article
      </Link>

      <ArticleList articles={articles} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const client = createApolloClient();

  const { data } = await client.query<{ articles: { items: Article[]; nextCursor?: string } }>({
    query: GET_ARTICLES,
    variables: { limit: 10 },
  });

  return {
    props: {
      articles: data?.articles?.items ?? [],
      initialApolloState: client.cache.extract(),
    },
  };
};