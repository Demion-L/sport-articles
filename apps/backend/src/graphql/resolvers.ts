export const resolvers = {
  Query: {
    articles: () => {
      return [
        {
          id: "1",
          title: "Test Article",
          content: "Hello GraphQL",
          createdAt: new Date().toISOString(),
        },
      ];
    },
  },
};
