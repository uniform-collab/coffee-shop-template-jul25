import { NextResponse } from 'next/server';
import { ContentClient } from '@uniformdev/canvas';
import { Product } from '@/types';

import { mapUniformContentEntryFields } from '@/utils/mappers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const productSlugs = searchParams.getAll('productSlugs');

  if (!productSlugs || productSlugs.length === 0) {
    return NextResponse.json([]);
  }

  const contentClient = new ContentClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiHost: process.env.UNIFORM_CLI_BASE_URL!,
    edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL!,
  });

  const { entries } = await contentClient.getEntries({
    filters: {
      slug: {
        in: productSlugs as string & string[],
      },
    },
    locale: 'en',
  });

  const products = entries.map(item => mapUniformContentEntryFields<Product>(item.entry));

  return NextResponse.json(products);
}
