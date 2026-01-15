import { useRouter } from "next/router";
import { useState } from "react";
import { createArticle } from "../../lib/api/articleMutations.js";
import type { PagesRouter } from "../../types/article.js";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter() as unknown as PagesRouter;

  async function submit() {
    if (!title || !content) return alert("Missing fields");

    const article = await createArticle({ title, content });
    (router as any).push(`/article/${article.id}`);
  }

  return (
    <div className="p-6">
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={submit}>Create</button>
    </div>
  );
}
