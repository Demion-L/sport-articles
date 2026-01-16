import { useState } from "react";
import type { ArticleFormProps } from "../types/article.js";

export default function ArticleForm({
  initialValues,
  onSubmit,
  loading = false,
  submitLabel = "Save",
}: ArticleFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setError(null);
    await onSubmit({ title, content });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />

      <textarea
        placeholder="Content"
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
