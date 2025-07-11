import { FC } from 'react';
import { ProductCardSkeleton } from '@/components/custom-ui/ProductCard';

type FavoritesSkeletonProps = {
  count?: number;
};

export const FavoritesSkeleton: FC<FavoritesSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:pt-14 lg:mb-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};
