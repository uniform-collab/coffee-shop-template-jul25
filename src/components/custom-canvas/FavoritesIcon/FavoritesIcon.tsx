'use client';

import { FC } from 'react';
import classNames from 'classnames';

import { cn } from '@uniformdev/csk-components/utils/styling';
import { useFavorites } from '@/providers/FavoritesProvider';
import { FavoritesIconClientProps } from './FavoritesIconClient';
import { FavoritesIconSkeleton } from './skeleton';

const FavoritesIcon: FC<FavoritesIconClientProps> = ({ filledFavoritesIcon, emptyFavoritesIcon, ...props }) => {
  const { isFavoritesLoading, storedFavorites } = useFavorites();

  const hasItems = Boolean(Object.keys(storedFavorites).length);

  if (isFavoritesLoading && !hasItems) {
    return <FavoritesIconSkeleton />;
  }

  return (
    <div
      className={cn('relative size-[1em]', {
        [`text-${props.size}`]: !!props.size,
      })}
    >
      <div
        className={classNames('absolute inset-0 transition-opacity duration-300', {
          'opacity-0 pointer-events-none': hasItems,
          'opacity-100': !hasItems,
        })}
      >
        {emptyFavoritesIcon}
      </div>

      <div
        className={classNames('absolute inset-0 transition-opacity duration-300', {
          'opacity-100': hasItems,
          'opacity-0 pointer-events-none': !hasItems,
        })}
      >
        {filledFavoritesIcon}
      </div>
    </div>
  );
};

export default FavoritesIcon;
