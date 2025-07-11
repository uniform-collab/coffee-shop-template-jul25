import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
import { ContainerProps as CSKContainerProps } from '@uniformdev/csk-components/components/canvas';

type IconSize = keyof DefaultTheme['fontSize'];

export type AddToFavoritesProps = {
  addIcon: string;
  removeIcon: string;
  productSlug: string;
  position?: 'top-right' | 'bottom';
  backgroundColor?: CSKContainerProps['backgroundColor'];
  spacing?: CSKContainerProps['spacing'];
  size?: IconSize;
};

export { AddToFavorites as default } from './AddToFavorites';
export { AddToFavoritesSkeleton } from './skeleton';
