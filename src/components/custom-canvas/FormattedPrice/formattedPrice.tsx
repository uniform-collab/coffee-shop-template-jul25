import { FC } from 'react';
import { Text as BaseText } from '@uniformdev/csk-components/components/ui';
import { FormattedPriceProps } from '.';

export const FormattedPrice: FC<FormattedPriceProps> = ({
  price,
  currency,
  size,
  tag,
  color,
  weight,
  font,
  transform,
  decoration,
  letterSpacing,
  lineCountRestrictions,
  alignment,
}) => {
  const Tag = tag || 'span';

  if (!price || !currency) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(
    price
  );
  return (
    <BaseText
      {...{ color, size, font, weight, transform, decoration, letterSpacing, alignment, lineCountRestrictions }}
    >
      <Tag>{formattedPrice}</Tag>
    </BaseText>
  );
};
