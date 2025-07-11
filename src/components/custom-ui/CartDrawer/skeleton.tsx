import { FC } from 'react';
import { ShoppingCartItemSkeleton } from '@/components/custom-ui/ShoppingCartItem';

type CartDrawerSkeletonProps = {
  itemsCount?: number;
};

const CartDrawerSkeleton: FC<CartDrawerSkeletonProps> = ({ itemsCount = 2 }) => (
  <div className="relative flex h-full animate-pulse flex-col">
    <div className="fixed top-0 flex w-full items-center justify-between border-b bg-white px-4 py-2 sm:px-14 lg:py-0">
      <div className="group flex h-16 w-24 items-center">
        <div className="size-3 rounded-full bg-gray-200"></div>
        <div className="h-4 w-16 rounded bg-gray-200 pl-2"></div>
      </div>
      <div className="flex items-center justify-around text-xl font-extrabold">
        <div className="mr-2 h-6 w-20 rounded bg-gray-200"></div>
        <div className="mr-4 h-6 w-12 rounded bg-gray-200"></div>
        <div className="size-6 rounded-full bg-gray-200"></div>
      </div>
    </div>

    <div className="mt-16 box-border flex flex-col">
      {[...Array(itemsCount)].map((_, idx) => (
        <ShoppingCartItemSkeleton key={idx} variant="mini" />
      ))}

      <div className="pr-4 pt-11 sm:pr-14">
        <div className="flex flex-row justify-end text-2xl font-bold">
          <div className="h-6 w-32 rounded bg-gray-200 pr-4"></div>
          <div className="h-6 w-20 rounded bg-gray-200"></div>
        </div>
        <div className="flex flex-row justify-end py-4">
          <div className="block w-max rounded bg-gray-300 px-10 py-4 text-white"></div>
        </div>
      </div>
    </div>
  </div>
);

export default CartDrawerSkeleton;
