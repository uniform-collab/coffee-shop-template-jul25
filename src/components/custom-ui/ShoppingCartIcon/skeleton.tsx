import { FC } from 'react';

export const ShoppingCartIconSkeleton: FC = () => (
  <div className="relative animate-pulse">
    <div className="flex w-fit items-center gap-x-3 text-2xl">
      <div className="relative size-[1em]">
        <div className="relative size-full rounded-full bg-gray-200" />
      </div>
    </div>
    <div className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-gray-300">
      <div className="size-2 rounded-full bg-white" />
    </div>
  </div>
);
