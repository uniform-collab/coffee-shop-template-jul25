export { ShoppingCartItem as default } from './ShoppingCartItem';
export * from './skeleton';
import { Product } from '@/types';

export type ShoppingCartItemProps = {
  product: Product;
  quantity: number;
  variant?: 'default' | 'mini';
  updateItemQuantity?: (productKey: string, newQuantity: number) => void;
  removeItemFromCart?: (productKey: string) => void;
  secondaryTextColor?: string;
};
