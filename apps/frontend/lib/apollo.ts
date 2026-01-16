import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            articles: {
              keyArgs: false,
              merge(existing, incoming) {
                if (!existing) return incoming;
                return {
                  items: [...existing.items, ...incoming.items],
                  nextCursor: incoming.nextCursor,
                };
              },
            },
          },
        },
      },
    }),
  });
}
