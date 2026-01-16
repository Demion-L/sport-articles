import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/router.js";
import { UPDATE } from "../../../lib/queries/articles.js";
import type { Article } from "../../../types/article.js";
import ArticleForm from "../../../components/ArticleForm.js";


type Props = {
  article: Article;
};

export default function EditArticlePage({ article }: Props) {
  const router = useRouter();

  const [updateArticle, { loading, error }] = useMutation(UPDATE);

  async function handleSubmit(values: {
    title: string;
    content: string;
  }) {
    await updateArticle({
      variables: {
        id: article.id,
        input: values,
      },
    });

    

    router.push(`/article/${article.id}`);
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit article</h1>

      {error && (
        <p className="text-red-500 mb-2">
          {error.message}
        </p>
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
