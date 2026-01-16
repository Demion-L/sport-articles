import { ArticleInput } from "../types/article";
import { prisma } from "../prisma";


export const resolvers = {
  Query: {
    articles: async (_: any, { limit, cursor }: { limit: number; cursor?: string }) => {
      const items = await prisma.sportsArticle.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        skip: cursor ? 1 : 0,
      });

      const hasMore = items.length > limit;
      if (hasMore) items.pop();
      const nextCursor = hasMore && items.length ? items[items.length - 1].id : null;
      return { items, nextCursor };
    },

    article: async (_: any, { id }: { id: string }) => {
      const article = await prisma.sportsArticle.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!article) {
        throw new Error("Article not found");
      }

      return article;
    },
  },

  Mutation: {
    createArticle: async (
      _: any,
      { input }: { input: ArticleInput }
    ) => {
      if (!input.title || !input.content) {
        throw new Error("Title and content are required");
      }

      return prisma.sportsArticle.create({
        data: {
          title: input.title,
          content: input.content,
          imageUrl: input.imageUrl,
        },
      });
    },

    updateArticle: async (
      _: any,
      {
        id,
        input,
      }: { id: string; input: ArticleInput }
    ) => {
      const existing = await prisma.sportsArticle.findUnique({ where: { id } });

      if (!existing || existing.deletedAt) {
        throw new Error("Article not found");
      }

      return prisma.sportsArticle.update({
        where: { id },
        data: {
          title: input.title,
          content: input.content,
          imageUrl: input.imageUrl,
        },
      });
    },

    deleteArticle: async (_: any, { id }: { id: string }) => {
      const existing = await prisma.sportsArticle.findUnique({ where: { id } });

      if (!existing || existing.deletedAt) {
        return false;
      }

      await prisma.sportsArticle.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });

      return true;
    },
  },
};
