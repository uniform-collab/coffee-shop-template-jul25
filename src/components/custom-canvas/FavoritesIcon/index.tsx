import { FC } from 'react';
import { NavigationLink as CSKNavigationLink } from '@uniformdev/csk-components/components/canvas';
import FavoritesIconClient, { FavoritesIconProps } from './FavoritesIconClient';

const FavoritesIcon: FC<FavoritesIconProps> = props => {
  const { filledFavoritesIcon, emptyFavoritesIcon } = props;

  return (
    <FavoritesIconClient
      {...props}
      filledFavoritesIcon={<CSKNavigationLink className="text-red-500" icon={filledFavoritesIcon} {...props} />}
      emptyFavoritesIcon={<CSKNavigationLink icon={emptyFavoritesIcon} {...props} />}
    />
  );
};

export default FavoritesIcon;
