import { useCallback, useEffect, useMemo } from "react";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/router.js";
import { DELETE } from "../../lib/queries/articles.js";
import type {
  Article,
  DeleteArticleData,
  DeleteArticleVariables,
} from "../../types/article.js";

type Props = {
  article: Article;
};

export default function ArticlePage({ article }: Props) {
  const router = useRouter();

  const [deleteArticle, { loading }] = useMutation<
    DeleteArticleData,
    DeleteArticleVariables
  >(DELETE);

  const editHref = useMemo(() => `/article/edit/${article.id}`, [article.id]);

  useEffect(() => {
    router.prefetch(editHref).catch(() => {
      // Prefetch failures are non-critical
    });
  }, [router, editHref]);

  const handleEdit = useCallback(() => {
    router.push(editHref);
  }, [router, editHref]);

  const handleDelete = useCallback(async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmed) return;

    try {
      const { data } = await deleteArticle({
        variables: { id: article.id },
      });

      if (data?.deleteArticle) {
        router.push("/");
      }
    } catch (err) {
      console.error("Failed to delete article:", err);
      alert("Failed to delete article");
    }
  }, [article.id, deleteArticle, router]);

  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-6 border-b border-slate-200 pb-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Feature article
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">
          {article.title}
        </h1>
      </header>

      <article className="prose prose-lg text-slate-800">
        <p>{article.content}</p>
      </article>

      <ArticleActions
        onEdit={handleEdit}
        onDelete={handleDelete}
        deleting={loading}
      />
    </section>
  );
}

type ArticleActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
};

function ArticleActions({ onEdit, onDelete, deleting }: ArticleActionsProps) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        onClick={onEdit}
        className="rounded-full bg-slate-900 px-5 py-2.5 font-medium text-white transition hover:bg-slate-800"
      >
        Edit
      </button>

      <button
        onClick={onDelete}
        disabled={deleting}
        className="rounded-full border border-red-500 px-5 py-2.5 font-semibold text-red-500 transition hover:bg-red-500/10 disabled:opacity-60"
      >
        {deleting ? "Deleting…" : "Delete"}
      </button>
    </div>
  );
}
