'use client';

import { FC, useState } from 'react';
import { ContainerProps, TextParameters } from '@uniformdev/csk-components/components/canvas';
import { Button, Container, Text as BaseText } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 1000;

type QuantitySelectorProps = {
  border: string;
} & Omit<ContainerProps, 'height'> &
  Omit<TextParameters, 'tag' | 'text'>;

const QuantitySelector: FC<QuantitySelectorProps> = ({
  border,
  size,
  color,
  weight,
  font,
  lineCountRestrictions,
  spacing,
  backgroundColor,
  fluidContent,
}) => {
  const [count, setCount] = useState(MIN_QUANTITY);

  const onAdd = () => {
    if (count < MAX_QUANTITY) setCount(prev => prev + 1);
  };

  const onMinus = () => {
    if (count > MIN_QUANTITY) setCount(prev => prev - 1);
  };

  return (
    <Container className="flex border-collapse" {...{ spacing, backgroundColor, fluidContent }}>
      <Button className="size-12" border={border} onClick={onMinus}>
        <BaseText {...{ color, size, font, weight, lineCountRestrictions }}>-</BaseText>
      </Button>
      <div
        className={cn('h-12 w-16 flex', {
          [`!border-x-0 ${border}`]: border,
        })}
      >
        <BaseText {...{ color, size, font, weight, lineCountRestrictions }}>
          <div className="m-auto">{count}</div>
        </BaseText>
      </div>
      <Button className="size-12" border={border} onClick={onAdd}>
        <BaseText {...{ color, size, font, weight, lineCountRestrictions }}>+</BaseText>
      </Button>
    </Container>
  );
};

export default QuantitySelector;
