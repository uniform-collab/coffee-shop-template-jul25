import { FC } from 'react';
import { Grid as CSKGrid, GridProps as CSKGridProps } from '@uniformdev/csk-components/components/canvas';
import { cn, resolveViewPort } from '@uniformdev/csk-components/utils/styling';

type ButtonProps = CSKGridProps & {
  alignItems?: string;
};

const Grid: FC<ButtonProps> = ({ alignItems, ...props }) => (
  <CSKGrid
    className={cn({
      [resolveViewPort(alignItems, 'items-{value}')]: alignItems,
    })}
    {...props}
  />
);

export default Grid;
