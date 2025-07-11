'use client';

import { FC, useState } from 'react';
import { useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { Button as CSKButton, ButtonProps as CSKButtonProps } from '@uniformdev/csk-components/components/canvas';
import { Button as CSKUIButton } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useCard } from '@/providers/CardProvider';
import AnimatedDotsText from '../custom-ui/AnimatedDotsText';

type AddToCardButtonProps = CSKButtonProps & {
  fullWidth?: boolean;
  productSlug: string;
  openMiniCart?: boolean;
};

const DELAY_TIME = 1600;

const AddToCardButton: FC<AddToCardButtonProps> = ({ productSlug, openMiniCart, fullWidth, ...props }) => {
  const { context } = useUniformContext();
  const { addToCard } = useCard();
  const [showAdded, setShowAdded] = useState(false);

  const onClick = async () => {
    if (showAdded) {
      setShowAdded(false);
      return;
    }
    await context?.update({
      events: [{ event: 'added-to-cart' }],
    });
    addToCard(productSlug, 1, openMiniCart);
    if (!openMiniCart) {
      setShowAdded(true);
      setTimeout(() => {
        setShowAdded(false);
      }, DELAY_TIME);
    }
  };

  return (
    <div className="relative w-full">
      {showAdded ? (
        <CSKUIButton
          className={cn('h-fit relative', {
            'w-full text-center [&>span]:w-full': fullWidth,
          })}
          {...props}
          icon={undefined}
          onClick={onClick}
        >
          <span className="pointer-events-none invisible h-0 select-none">{props?.text}</span>
          <span className="absolute inset-0 flex size-full items-center justify-center">
            <AnimatedDotsText />
          </span>
        </CSKUIButton>
      ) : (
        <CSKButton
          className={cn('h-fit', {
            'w-full text-center [&>span]:w-full': fullWidth,
          })}
          {...props}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default AddToCardButton;
