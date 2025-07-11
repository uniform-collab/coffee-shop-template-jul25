'use server';

import { cookies } from 'next/headers';
import { CookieTransitionDataStore } from '@uniformdev/context';
import { getEnrichmentAndFieldKey, getMaxEnrichmentKey, getOrderByClause } from './search';

export const getEnrichmentBoostedOrderBy = async (boostEnrichments: string[]) => {
  const cookieStore = await cookies();

  const scoreCookie = cookieStore.get('ufvd')?.value;

  const transitionStore = new CookieTransitionDataStore({
    serverCookieValue: scoreCookie,
    experimental_quirksEnabled: true,
  });

  const enrichmentScores = transitionStore.data?.scores;

  const boostInclusions = boostEnrichments.reduce<Record<string, string>>((acc, enrichment) => {
    const { enrichmentKey } = getEnrichmentAndFieldKey(enrichment);
    const maxEnrichmentKey = getMaxEnrichmentKey(enrichmentKey, enrichmentScores ?? {});

    const [, boostValue] = maxEnrichmentKey?.split('_') ?? [];

    if (maxEnrichmentKey) {
      return { ...acc, [enrichment]: boostValue };
    }

    return acc;
  }, {});

  if (Object.keys(boostInclusions).length === 0) {
    return undefined;
  }

  const orderBy = getOrderByClause(boostInclusions);

  return orderBy;
};
