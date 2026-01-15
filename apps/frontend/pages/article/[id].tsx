import type { GetServerSideProps } from "next";
import { fetchArticle } from "../../lib/api/article.js";
import type { Article } from "../../types/article.js";

type Props = {
  article: Article;
};

export default function ArticlePage({ article }: Props) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const id = ctx.params?.id as string;

  try {
    const article = await fetchArticle(id);
    return { props: { article } };
  } catch {
    return { notFound: true };
  }
};
