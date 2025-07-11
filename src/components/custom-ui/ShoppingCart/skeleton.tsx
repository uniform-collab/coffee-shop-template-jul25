import { FC } from 'react';
import { Container } from '@uniformdev/csk-components/components/ui';
import { ShoppingCartItemSkeleton } from '@/components/custom-ui/ShoppingCartItem';

type ShoppingCartSkeletonProps = {
  itemsCount?: number;
};

export const ShoppingCartSkeleton: FC<ShoppingCartSkeletonProps> = ({ itemsCount = 2 }) => (
  <Container className="md:pt-14 lg:mb-8">
    <div className="flex animate-pulse flex-col gap-4 text-black">
      <div className="hidden flex-row border-b pb-4 font-bold md:flex">
        <div className="basis-3/5">ITEM</div>
        <div className="basis-1/5">QTY</div>
        <div className="basis-1/5 text-right">PRICE</div>
      </div>

      {Array.from({ length: itemsCount }).map((_, idx) => (
        <ShoppingCartItemSkeleton key={idx} />
      ))}

      <div className="flex justify-end pt-6">
        <div className="h-6 w-40 rounded bg-gray-200"></div>
      </div>

      <div className="flex justify-end pt-4">
        <div className="h-10 w-48 rounded bg-gray-300"></div>
      </div>
    </div>
  </Container>
);
