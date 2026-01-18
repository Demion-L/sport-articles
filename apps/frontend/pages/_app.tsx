import type { AppProps } from "next/app.js";
import { ApolloProvider } from "@apollo/client/react";
import { useApollo } from "../lib/apolloClient.js";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState ?? null);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
