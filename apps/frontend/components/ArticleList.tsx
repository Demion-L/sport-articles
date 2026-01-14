import Link from "next/link";
import type { ArticlesProps } from "../types/article.js";
import { truncate } from "../lib/helpers.js";

export default function ArticleList({ articles }: ArticlesProps) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id} className="mb-3 border-b pb-2">
          <Link href={`/article/${article.id}`} className="text-xl font-semibold">
            {article.title}
          </Link>
          <p>{truncate(article.content, 100)}</p>
        </li>
      ))}
    </ul>
  );
}
