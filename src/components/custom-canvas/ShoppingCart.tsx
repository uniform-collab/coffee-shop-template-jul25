'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ShoppingCartSkeleton } from '@/components/custom-ui/ShoppingCart';

enum ShoppingCartSlots {
  CheckoutButton = 'checkoutButton',
  EmptyCartContent = 'emptyCartContent',
}

type ShoppingCartParameters = {
  primaryTextColor?: string;
  secondaryTextColor?: string;
};

export type ShoppingCartProps = ComponentProps<ShoppingCartParameters, ShoppingCartSlots>;

const ShoppingCartClient = dynamic(() => import('@/components/custom-ui/ShoppingCart').then(mod => mod.default), {
  ssr: false,
  loading: () => <ShoppingCartSkeleton />,
});

const ShoppingCart: FC<ShoppingCartProps> = ({ component, context, slots, ...props }) => (
  <ShoppingCartClient
    {...props}
    emptyCartContent={<UniformSlot context={context} slot={slots.emptyCartContent} data={component} />}
    checkoutButton={<UniformSlot context={context} slot={slots.checkoutButton} data={component} />}
  />
);

export default ShoppingCart;
