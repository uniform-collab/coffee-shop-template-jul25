'use client';

import { FC, ReactNode, useState } from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useCard } from '@/providers/CardProvider';
import { ShoppingCartIconSkeleton } from './skeleton';

type ShoppingCartIconProps = {
  animateWhenEmpty?: boolean;
  emptyShoppingCartLink: ReactNode;
  filledShoppingCartLink: ReactNode;
};

const ShoppingCartIcon: FC<ShoppingCartIconProps> = ({
  animateWhenEmpty = false,
  filledShoppingCartLink,
  emptyShoppingCartLink,
}) => {
  const { totalQuantity, isCartLoading, cartProducts } = useCard();
  const [isShaking, setIsShaking] = useState(false);
  const hasItems = Boolean(cartProducts.length);

  const handleClick = () => {
    if (totalQuantity === 0 && animateWhenEmpty) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  if (isCartLoading && !hasItems) {
    return <ShoppingCartIconSkeleton />;
  }

  return (
    <div
      onClick={handleClick}
      className={cn('relative', {
        'cursor-pointer': totalQuantity === 0,
        'animate-shake': isShaking,
      })}
    >
      <div>{totalQuantity === 0 ? emptyShoppingCartLink : filledShoppingCartLink}</div>
      <div
        className={cn(
          'absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold transition-all duration-300',
          totalQuantity ? 'opacity-100 scale-100 animate-fadeInBadge' : 'opacity-0 scale-75 pointer-events-none'
        )}
      >
        <span>{totalQuantity}</span>
      </div>
    </div>
  );
};

export default ShoppingCartIcon;
