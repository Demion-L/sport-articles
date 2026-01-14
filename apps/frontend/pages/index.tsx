import type { GetServerSideProps } from "next";
import { gql } from "@apollo/client";
import { client } from "../lib/apollo.js";
import Link from "next/link";
import ArticleList from "../components/ArticleList.js";
import type { Article, ArticlesProps } from "../types/article.js";


const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      title
      content
    }
  }
`;

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


export const getServerSideProps: GetServerSideProps<ArticlesProps> = async () => {
  try {
    const { data } = await client.query<{ articles: Article[] }>({
      query: GET_ARTICLES,
      fetchPolicy: "no-cache",
    });

    return {
      props: {
        articles: data?.articles || [],
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        articles: [],
      },
    };
  }
};
