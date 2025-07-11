import { ReactElement } from 'react';

export type ProductCardProps = {
  image: string;
  title: ReactElement | string;
  price: number;
  currency: string;
  category?: string;
  slug: string;
  link: string;
  textColor: string;
  addToFavoritesIcon?: string;
  removeFromFavoritesIcon?: string;
  rating?: number;
};

export { ProductCard as default } from './ProductCard';
export { ProductCardSkeleton } from './skeleton';
