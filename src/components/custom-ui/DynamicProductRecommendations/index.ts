import { ReactElement } from 'react';
import { ContainerProps as CSKContainerProps } from '@uniformdev/csk-components/components/ui';

export type DynamicRecommendationsProps = Omit<CSKContainerProps, 'title'> & {
  loadingIndicatorColor?: string;
  // Each entry should be in the format: "enrichmentKey,fieldKey".
  // This allows us to map an enrichment to its corresponding product field.
  boostEnrichments: string[];
  title: ReactElement;
  maxRecommendations?: string;
};

export { default as DynamicProductRecommendations } from './DynamicProductRecommendations';
