import { FC } from 'react';
import {
  GridItem as CSKGridItem,
  GridItemProps as CSKGridItemProps,
} from '@uniformdev/csk-components/components/canvas';

type GridItemProps = CSKGridItemProps;

const GridItem: FC<GridItemProps> = props => <CSKGridItem className="h-full" {...props} />;

export default GridItem;
