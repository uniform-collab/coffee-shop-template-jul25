import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import {
  DynamicProductRecommendations as BaseDynamicProductRecommendations,
  DynamicRecommendationsProps as BaseDynamicRecommendationsProps,
} from '@/components/custom-ui/DynamicProductRecommendations';

enum DynamicRecommendationsSlots {
  DynamicRecommendationsTitle = 'dynamicRecommendationsTitle',
}

type DynamicRecommendationsProps = ComponentProps<BaseDynamicRecommendationsProps, DynamicRecommendationsSlots>;

const DynamicProductRecommendations: FC<DynamicRecommendationsProps> = ({
  component,
  context,
  slots,
  backgroundColor,
  spacing,
  fluidContent,
  height,
  border,
  loadingIndicatorColor,
  boostEnrichments,
  maxRecommendations,
}) => (
  <BaseDynamicProductRecommendations
    {...{
      backgroundColor,
      spacing,
      border,
      fluidContent,
      height,
      boostEnrichments,
      loadingIndicatorColor,
      maxRecommendations,
    }}
    title={<UniformSlot data={component} context={context} slot={slots.dynamicRecommendationsTitle} />}
  />
);

export default DynamicProductRecommendations;
