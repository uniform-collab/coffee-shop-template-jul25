'use client';

import { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { ShoppingCartIconSkeleton } from '@/components/custom-ui/ShoppingCartIcon';

const ShoppingCartIconClient = dynamic(
  () => import('@/components/custom-ui/ShoppingCartIcon').then(mod => mod.default),
  {
    ssr: false,
    loading: () => <ShoppingCartIconSkeleton />,
  }
);

type ShoppingCartIconProps = {
  animateWhenEmpty?: boolean;
  emptyShoppingCartLink: ReactNode;
  filledShoppingCartLink: ReactNode;
};

const ShoppingCartIcon: FC<ShoppingCartIconProps> = props => <ShoppingCartIconClient {...props} />;

export default ShoppingCartIcon;
