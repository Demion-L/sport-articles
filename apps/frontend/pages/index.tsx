import type { GetServerSideProps } from "next";
import { initializeApollo } from "../lib/apolloClient.js";
import { GET_ARTICLES } from "../lib/queries/articles.js";
import ArticleList from "../components/ArticleList.js";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sports Articles</h1>
      <Link
        href="/article/create"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create article
      </Link>
      <ArticleList />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ARTICLES,
    variables: { limit: 10 },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
