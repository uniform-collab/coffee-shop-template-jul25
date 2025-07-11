'use server';

import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE, EntryFilters } from '@uniformdev/canvas';
import { Facets } from '@/types';
import contentClient from './contentClient';

interface GetEntriesProps {
  preview?: boolean;
  filters: EntryFilters;
  facetBy?: string;
}

const getFacets = ({ preview = false, filters, facetBy }: GetEntriesProps): Promise<Facets> => {
  return contentClient
    .getEntries({
      filters,
      limit: 1,
      offset: 0,
      state: preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
      withTotalCount: true,
      locale: 'en',
      facetBy,
    })
    .then(response => response.facets as Facets);
};

export default getFacets;
