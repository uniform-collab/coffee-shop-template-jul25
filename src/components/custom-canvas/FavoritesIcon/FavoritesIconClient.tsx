'use client';

import { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';

import { AssetParamValue } from '@uniformdev/assets';
import { NavigationLinkProps as CSKNavigationLinkProps } from '@uniformdev/csk-components/components/canvas';
import { FavoritesIconSkeleton } from './skeleton';

export type FavoritesIconProps = Omit<CSKNavigationLinkProps, 'icon'> & {
  emptyFavoritesIcon: AssetParamValue;
  filledFavoritesIcon: AssetParamValue;
};

const FavoritesIconClient = dynamic(() => import('./FavoritesIcon').then(mod => mod.default), {
  ssr: false,
  loading: () => <FavoritesIconSkeleton />,
});

export type FavoritesIconClientProps = Omit<FavoritesIconProps, 'filledFavoritesIcon' | 'emptyFavoritesIcon'> & {
  filledFavoritesIcon: ReactNode;
  emptyFavoritesIcon: ReactNode;
};

const FavoritesIcon: FC<FavoritesIconClientProps> = props => <FavoritesIconClient {...props} />;

export default FavoritesIcon;
