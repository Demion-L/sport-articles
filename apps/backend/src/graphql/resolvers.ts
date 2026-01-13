import { prisma } from "../prisma";

export const resolvers = {
  Query: {
    articles: async () => {
      return prisma.sportsArticle.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
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
      { input }: { input: { title: string; content: string; imageUrl?: string } }
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
      }: { id: string; input: { title: string; content: string; imageUrl?: string } }
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
