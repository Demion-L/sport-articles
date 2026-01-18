import merge from "deepmerge";
import type { Options } from "deepmerge";
import isEqual from "lodash/isEqual.js";
import { useMemo } from "react";
import type { NormalizedCacheObject } from "@apollo/client";
import { createApolloClient } from "./createApolloClient.js";
import type { Article } from "../types/article.ts";
import type { ApolloClientInstance } from "../types/article.ts";
let apolloClient: ApolloClientInstance | undefined;

const mergeUniqueArrays = <T>(
  destination: T[],
  source: T[]
): T[] => {
  const uniqueDest = destination.filter(destItem =>
    !source.some(
      srcItem => isEqual(destItem, srcItem)
    )
  );
  return [...source, ...uniqueDest];
};



const mergeOptions: Options = {
  arrayMerge: mergeUniqueArrays,
};

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract() as NormalizedCacheObject;

    const data = merge<NormalizedCacheObject>(existingCache, initialState, mergeOptions);

    _apolloClient.cache.restore(data);
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject | null) {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
