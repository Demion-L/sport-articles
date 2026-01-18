import { useRouter } from "next/router.js";
import { useMutation } from "@apollo/client/react";
import { GET_ARTICLE, UPDATE } from "../../../lib/queries/articles.js";
import { initializeApollo } from "../../../lib/apolloClient.js";
import type { Article, ArticleFormValues, UpdateArticleData, UpdateArticleVariables } from "../../../types/article.js";
import ArticleForm from "../../../components/ArticleForm.js";
import type { GetServerSideProps } from "next";

type Props = {
  article: Article;
};

export default function EditArticlePage({ article }: Props) {
  const router = useRouter();

  const [updateArticle, { loading, error }] = useMutation<
    UpdateArticleData,
  UpdateArticleVariables
  >(UPDATE);

async function handleSubmit(values: ArticleFormValues) {
  const { data } = await updateArticle({
    variables: { id: article.id, input: values },
  });

  if (data?.updateArticle) {
    router.push(`/article/${article.id}`);
  }
}

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit article</h1>

      {error && (
        <div className="text-red-500 mb-2">
          {error.message ?? "An error occurred"}
        </div>
      )}

      <ArticleForm
        initialValues={{
          title: article.title,
          content: article.content ?? "",
        }}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const id = params?.id as string;
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query<{ article: Article }>({
      query: GET_ARTICLE,
      variables: { id },
    });

    if (!data?.article) {
      return { notFound: true };
    }

    return {
      props: {
        article: data.article,
      },
    };
  } catch (err) {
    console.error("Failed to fetch article for edit:", err);
    return { notFound: true };
  }
};