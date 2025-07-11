'use client';

import { FC } from 'react';
import { Container, Image } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useFavorites } from '@/providers/FavoritesProvider';
import { AddToFavoritesProps } from '.';

export const AddToFavorites: FC<AddToFavoritesProps> = ({
  addIcon,
  removeIcon,
  productSlug,
  position,
  backgroundColor,
  spacing,
  size,
}) => {
  const { storedFavorites, toggleFavorite } = useFavorites();

  const isInFavorites = storedFavorites[productSlug];
  const label = isInFavorites ? 'Remove from favorites' : 'Add to favorites';

  const toggleFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleFavorite(productSlug);
  };

  return (
    <Container
      fluidContent
      spacing={spacing}
      backgroundColor={backgroundColor}
      className={cn('flex justify-center items-center', {
        [`text-${size}`]: !!size,
        'absolute top-0 right-0': position === 'top-right',
      })}
    >
      <button
        aria-label={label}
        onClick={toggleFavorites}
        className="relative size-[1.5em] transition-transform hover:scale-110"
      >
        <div
          className={cn('absolute inset-0 transition-opacity duration-300', {
            'opacity-0 pointer-events-none': isInFavorites,
            'opacity-100': !isInFavorites,
          })}
        >
          <Image src={addIcon} fill alt="Add to favorites" />
        </div>

        <div
          className={cn('absolute inset-0 transition-opacity duration-300', {
            'opacity-100': isInFavorites,
            'opacity-0 pointer-events-none': !isInFavorites,
          })}
        >
          <Image src={removeIcon} fill alt="Remove from favorites" />
        </div>
      </button>
    </Container>
  );
};
