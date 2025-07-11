import { FC, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@uniformdev/csk-components/utils/styling';
import CloseIcon from '@/components/custom-ui/CloseIcon';
import ProductQuantityItem from '@/components/custom-ui/ProductQuantityItem';
import { ShoppingCartItemProps } from '.';

export const ShoppingCartItem: FC<ShoppingCartItemProps> = ({
  product,
  quantity,
  variant = 'default',
  updateItemQuantity,
  removeItemFromCart,
  secondaryTextColor,
}) => {
  const { primaryImage, slug, name, variants } = product;

  const { price, currency } = variants?.[0] || {};

  const [productImage] = primaryImage;

  const increaseProductQuantity = useCallback(
    async (): Promise<void> => updateItemQuantity?.(slug, quantity + 1),
    [quantity, updateItemQuantity, slug]
  );

  const decreaseProductQuantity = useCallback(
    async (): Promise<void> => updateItemQuantity?.(slug, quantity - 1),
    [quantity, updateItemQuantity, slug]
  );

  const handleRemoveProductButtonClick = useCallback(() => {
    removeItemFromCart?.(slug);
  }, [slug, removeItemFromCart]);

  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(
    price
  );

  return (
    <div
      className={cn('flex flex-col py-3', {
        'md:flex-row border-b': variant === 'default',
        'py-2': variant === 'mini',
      })}
    >
      <div className="basis-3/5">
        <div className={cn('font-bold block', { 'md:hidden': variant === 'default' })}>ITEM</div>
        <div className={cn('flex flex-col py-4 ', { 'md:flex-row lg:py-3': variant === 'default' })}>
          <div className={cn('flex justify-between flex-row', { 'md:block': variant === 'default' })}>
            <div
              className={cn('border border-slate-300 flex-initial w-28 h-28 hover:shadow-inner duration-300', {
                'lg:w-44 lg:h-44': variant === 'default',
              })}
            >
              <div
                className={cn('relative m-2  w-24 h-24  cursor-pointer', {
                  'lg:w-40 lg:h-40': variant === 'default',
                })}
              >
                <Link href={`products/${slug}`}>
                  {Boolean(productImage) && <Image fill src={productImage.url} alt={productImage.title || ''} />}
                </Link>
              </div>
            </div>
            <button
              type="button"
              className={cn('inline-flex items-center relative h-5 text-primary', {
                'md:hidden': variant === 'default',
              })}
              onClick={handleRemoveProductButtonClick}
            >
              <CloseIcon />
            </button>
          </div>
          <div
            className={cn('py-4 flex flex-col justify-between', {
              'md:px-10 md:py-0': variant === 'default',
              'pb-0': variant === 'mini',
            })}
          >
            <Link href={`products/${slug}`}>
              <div className={cn('cursor-pointer group', { 'lg:pt-4': variant === 'default' })}>
                <div className={cn('max-w-2xl', { 'lg:w-full': variant === 'default' })}>
                  <span className="text-xl font-bold duration-300 group-hover:underline lg:text-2xl">{name}</span>
                </div>
              </div>
            </Link>
            {Boolean(removeItemFromCart) && (
              <button
                type="button"
                className={cn('items-center mt-8 relative group h-5 hidden', {
                  'md:inline-flex': variant === 'default',
                })}
                onClick={handleRemoveProductButtonClick}
              >
                <CloseIcon className="fill-blue-500 stroke-blue-500" />
                <span
                  className={cn('pl-2 text-sm font-bold', {
                    [`text-${secondaryTextColor}`]: !!secondaryTextColor,
                  })}
                >
                  &nbsp;{'Remove'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={cn('flex flex-row justify-between basis-2/5', { 'md:pt-12 md:pb-8': variant === 'default' })}>
        <div>
          <div className={cn('font-bold block pb-2', { 'md:hidden': variant === 'default' })}>QTY</div>
          {Boolean(updateItemQuantity) ? (
            <ProductQuantityItem
              onClickIncrement={increaseProductQuantity}
              onClickDecrement={decreaseProductQuantity}
              quantity={quantity}
            />
          ) : (
            <span className="select-none font-bold">{quantity}</span>
          )}
        </div>
        <div>
          <div className={cn('font-bold block pb-2', { 'md:hidden': variant === 'default' })}>Price</div>
          <div className="text-xl md:text-2xl">{`${formattedPrice}`}</div>
        </div>
      </div>
    </div>
  );
};
