'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
import { AssetParamValue } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerProps as CSKContainerProps } from '@uniformdev/csk-components/components/canvas';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import { AddToFavoritesSkeleton } from '../custom-ui/AddToFavorites';

type IconSize = keyof DefaultTheme['fontSize'];

const AddToFavoritesClient = dynamic(() => import('@/components/custom-ui/AddToFavorites').then(mod => mod.default), {
  ssr: false,
  loading: () => <AddToFavoritesSkeleton />,
});

type AddToFavoritesParameters = {
  addIcon: AssetParamValue;
  removeIcon: AssetParamValue;
  productSlug: string;
  position?: 'top-right' | 'bottom';
  backgroundColor?: CSKContainerProps['backgroundColor'];
  spacing?: CSKContainerProps['spacing'];
  size?: IconSize;
};

type AddToFavoritesProps = ComponentProps<AddToFavoritesParameters>;

const AddToFavorites: FC<AddToFavoritesProps> = props => {
  const [addIcon] = resolveAsset(props.addIcon);
  const [removeIcon] = resolveAsset(props.removeIcon);

  return <AddToFavoritesClient {...props} addIcon={addIcon?.url} removeIcon={removeIcon?.url} />;
};

export default AddToFavorites;
