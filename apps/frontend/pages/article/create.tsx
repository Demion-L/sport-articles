import { useRouter } from "next/router.js";
import { useMutation } from "@apollo/client/react";

import ArticleForm from "../../components/ArticleForm.js";
import { CREATE } from "../../lib/queries/articles.js";
import type { 
  ArticleFormValues, 
  CreateArticleData, 
  CreateArticleVariables 
} from "../../types/article.js";



export default function CreateArticlePage() {
  const router = useRouter();

  const [createArticle, { loading, error }] = useMutation<
    CreateArticleData,
    CreateArticleVariables
  >(CREATE);

  async function handleSubmit(values: ArticleFormValues) {
    const { data } = await createArticle({
      variables: {
        input: values,
      },
    });

    if (data?.createArticle?.id) {
      router.push(`/article/${data.createArticle.id}`);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create article</h1>

      {error && (
        <p className="text-red-500 mb-2">{error.message}</p>
      )}

      <ArticleForm
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Create"
      />
    </div>
  );
}
