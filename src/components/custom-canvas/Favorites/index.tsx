'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { AssetParamValue } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { FavoritesSkeleton } from './skeleton';

const FavoritesClient = dynamic(() => import('./Favorites').then(mod => mod.default), {
  ssr: false,
  loading: () => <FavoritesSkeleton />,
});

enum FavoritesSlots {
  EmptyFavoritesContent = 'emptyFavoritesContent',
}

type FavoritesParameters = {
  primaryTextColor: string;
  addToFavoritesIcon: AssetParamValue;
  removeFromFavoritesIcon: AssetParamValue;
};

export type FavoritesProps = ComponentProps<FavoritesParameters, FavoritesSlots>;

const Favorites: FC<FavoritesProps> = props => <FavoritesClient {...props} />;

export default Favorites;
