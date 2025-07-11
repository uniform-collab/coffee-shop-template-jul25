import { ReactNode } from 'react';

export type ShoppingCartProps = {
  primaryTextColor?: string;
  secondaryTextColor?: string;
  emptyCartContent: ReactNode;
  checkoutButton: ReactNode;
};

export { default } from './ShoppingCart';
export * from './skeleton';
