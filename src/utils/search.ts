import { OrderBy } from '../types';

export const buildOrderByQuery = (orderBy: OrderBy) => {
  return `${orderBy.field}_${orderBy.direction}`;
};

export const getMaxEnrichmentKey = (boostEnrichment: string, scores: Record<string, number>): string | null => {
  return Object.entries(scores).reduce<{ key: string | null; score: number }>(
    (acc, [key, score]) => {
      if (key.startsWith(boostEnrichment)) {
        return score > acc.score ? { key, score } : acc;
      }

      return acc;
    },
    { key: null, score: -Infinity }
  ).key;
};

export const getOrderByClause = (userType: Record<string, string>) => {
  if (!userType) {
    return undefined;
  }

  const orderFields = Object.entries(userType).map(([category, value]) => {
    const { fieldKey } = getEnrichmentAndFieldKey(category);

    return `fields.${fieldKey}.slug:${value}:3`;
  });

  if (orderFields.length === 0) {
    return undefined;
  }

  return `boost|${orderFields.join('|')}`;
};

export const getEnrichmentAndFieldKey = (enrichment: string) => {
  const [enrichmentKey, fieldKey] = enrichment.split(',');
  return { enrichmentKey, fieldKey };
};
