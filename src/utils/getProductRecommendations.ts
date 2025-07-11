import { ContentClient } from '@uniformdev/canvas';
import { Product } from '@/types';
import { getEnrichmentBoostedOrderBy } from './getEnrichmentBoostedOrderBy';
import { mapUniformContentEntryFields } from './mappers';

type Args = {
  boostEnrichments: string[];
  maxRecommendations: number;
  entryType: string;
};

export async function getProductRecommendations({
  boostEnrichments,
  maxRecommendations,
  entryType,
}: Args): Promise<Product[]> {
  if (!process.env.UNIFORM_PROJECT_ID || !process.env.UNIFORM_API_KEY) {
    throw new Error('Missing required environment variables');
  }

  const orderBy = await getEnrichmentBoostedOrderBy(boostEnrichments);

  const contentClient = new ContentClient({
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL!,
    edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL!,
  });

  const { entries } = await contentClient.getEntries({
    filters: { type: { eq: entryType } },
    limit: maxRecommendations ?? 30,
    orderBy: orderBy ? [orderBy] : undefined,
    locale: 'en',
  });

  return entries.map(entry => mapUniformContentEntryFields<Product>(entry.entry));
}
