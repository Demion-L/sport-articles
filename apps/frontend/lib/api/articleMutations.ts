import { CREATE, UPDATE, DELETE } from "../queries/articles.js";
import { createApolloClient } from "../apollo.js";
import type { Article } from "../../types/article.js";

export async function createArticle(input: Omit<Article, "id">) {
  const client = createApolloClient();

  const { data } = await client.mutate<{ createArticle: Article }>({
    mutation: CREATE,
    variables: { input },
    update(cache, { data }) {
      const newArticle = data?.createArticle;
      if (!newArticle) return;

      cache.modify({
        fields: {
          articles(existing = []) {
            return [newArticle, ...existing];
          },
        },
      });
    },
  });

  return data!.createArticle;
}

export async function updateArticle(id: string, input: Partial<Article>) {
  const client = createApolloClient();

  const { data } = await client.mutate<{ updateArticle: Article }>({
    mutation: UPDATE,
    variables: { id, input },
  });

  return data!.updateArticle;
}

export async function deleteArticle(id: string) {
  const client = createApolloClient();

  await client.mutate<{ deleteArticle: boolean }>({
    mutation: DELETE,
    variables: { id },
    update(cache) {
      cache.modify({
        fields: {
          articles(existing = [], { readField }) {
            return existing.filter(
              (ref: any) => readField("id", ref) !== id
            );
          },
        },
      });
    },
  });
}
