import { FC, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@uniformdev/csk-components/components/ui';
import CloseIcon from '@/components/custom-ui/CloseIcon';
import ShoppingCartItem, { ShoppingCartItemSkeleton } from '@/components/custom-ui/ShoppingCartItem';
import { useLockScroll } from '@/hooks/useLockScroll';
import { useCard } from '@/providers/CardProvider';
import CartDrawerSkeleton from './skeleton';

type CartDrawerProps = {
  onCloseModal: () => void;
};

const CartDrawer: FC<CartDrawerProps> = ({ onCloseModal }) => {
  const { cartProducts, isCartLoading, storedCart, total, updateCard, removeFromCard, isModalCartOpen } = useCard();

  const productsContainerRef = useRef<HTMLDivElement>(null);

  useLockScroll(isModalCartOpen);

  useEffect(() => {
    if (!isModalCartOpen) return;
    // scroll modal to the bottom
    productsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isModalCartOpen]);

  useEffect(() => {
    // close modal on last product removed
    if (!cartProducts.length) onCloseModal();
  }, [onCloseModal, cartProducts.length]);

  const updateItemQuantity = useCallback(
    (productKey: string, newQuantity: number) => {
      updateCard(productKey, newQuantity);
    },
    [updateCard]
  );

  const removeItemFromCart = useCallback(
    (productKey: string) => {
      removeFromCard(productKey);
    },
    [removeFromCard]
  );

  const hasItems = Boolean(cartProducts.length);

  const isNewItemsAddedToCard = isCartLoading && Object.keys(storedCart).length > cartProducts.length;

  if (isCartLoading && !hasItems) {
    return <CartDrawerSkeleton />;
  }

  return (
    <div className="relative flex h-full flex-col ">
      <div className="fixed top-0 flex w-full items-center justify-between border-b bg-white px-4 py-2 sm:px-14 lg:py-0">
        <button className="group flex h-16 w-24 items-center" type="submit" onClick={onCloseModal}>
          <CloseIcon />
          <p className="pl-2 text-sm font-bold uppercase duration-300  group-hover:underline">Close</p>
        </button>

        <div className="flex items-center justify-around text-xl font-extrabold">
          <p className="mr-2 uppercase">My Cart</p>
          <div className="mr-4">{total}</div>
          <Image
            unoptimized
            alt="icon-cart"
            width={30}
            height={30}
            src="https://res.cloudinary.com/uniform-demos/image/upload/v1692282886/csk-icons/icon-cart_zzou3e_yovtho.svg"
          />
        </div>
      </div>

      <div ref={productsContainerRef} className="mt-16 box-border flex flex-col">
        <div>
          {cartProducts.map(item => {
            const productFromCart = storedCart[item.slug];

            if (!productFromCart) return <ShoppingCartItemSkeleton key={item.slug} variant="mini" />;

            return (
              <div key={item?.slug} className="border-b p-4 sm:px-14">
                <ShoppingCartItem
                  updateItemQuantity={updateItemQuantity}
                  removeItemFromCart={removeItemFromCart}
                  product={item}
                  quantity={productFromCart?.quantity}
                  variant="mini"
                />
              </div>
            );
          })}
          {isNewItemsAddedToCard && <ShoppingCartItemSkeleton variant="mini" />}
        </div>
        <div className="pr-4 pt-11 sm:pr-14">
          <div className="flex flex-row justify-end text-2xl font-bold">
            <span className="pr-4">Subtotal:</span>${total}
          </div>
          <div className="flex flex-row justify-end py-4">
            <Button className="bg-black px-10 py-4 text-white" size="medium" href="/cart/checkout">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
