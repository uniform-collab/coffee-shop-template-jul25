import { FC } from 'react';
import { Card as CSKCard, CardProps as CSKCardProps } from '@uniformdev/csk-components/components/canvas';

type CardProps = CSKCardProps;

const FlexCard: FC<CardProps> = props => (
  <CSKCard {...props} className="flex h-full flex-col justify-between" contentClassName="flex-1 justify-between" />
);

export default FlexCard;
