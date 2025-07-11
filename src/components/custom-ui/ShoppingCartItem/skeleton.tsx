import { FC } from 'react';

type ShoppingCartItemSkeletonProps = {
  variant?: 'default' | 'mini';
};

export const ShoppingCartItemSkeleton: FC<ShoppingCartItemSkeletonProps> = ({ variant = 'default' }) => {
  if (variant === 'mini') {
    return (
      <div className="border-b p-4 sm:px-14">
        <div className="flex flex-col py-3">
          <div className="basis-3/5">
            <div className="mb-4 block h-5 w-16 rounded bg-gray-200 font-bold"></div>
            <div className="flex flex-col py-4">
              <div className="flex flex-row justify-between">
                <div className="size-28 flex-initial rounded border border-slate-300 bg-gray-200"></div>
                <div className="relative inline-flex size-5 items-center rounded-full bg-gray-200"></div>
              </div>
              <div className="flex flex-col justify-between py-4 pb-0">
                <div className="group cursor-pointer">
                  <div className="max-w-2xl">
                    <div className="h-6 w-3/4 rounded bg-gray-200"></div>
                  </div>
                </div>
                <div className="group relative mt-8 hidden h-5 items-center">
                  <div className="h-4 w-20 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex basis-2/5 flex-row justify-between">
            <div>
              <div className="block pb-2 font-bold">QTY</div>
              <div className="flex h-[50px] w-44 flex-row justify-between border border-gray-100">
                <div className="h-full w-14 bg-gray-200"></div>
                <div className="flex w-full items-center justify-center border-x border-gray-100">
                  <div className="h-4 w-6 rounded bg-gray-200"></div>
                </div>
                <div className="h-full w-14 bg-gray-200"></div>
              </div>
            </div>
            <div>
              <div className="block pb-2 font-bold">Price</div>
              <div className="h-6 w-20 rounded bg-gray-200 text-xl md:text-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 border-b py-6 md:flex-row">
      {/* Image + Title */}
      <div className="flex basis-3/5 flex-col gap-4 md:flex-row">
        <div className="size-28 rounded bg-gray-200 lg:size-44"></div>
        <div className="flex flex-1 flex-col justify-between py-2 md:px-6">
          <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/2 rounded bg-gray-200"></div>
          <div className="mt-4 hidden items-center gap-2 md:inline-flex">
            <div className="size-4 rounded-full bg-gray-200"></div>
            <div className="h-4 w-20 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>

      {/* Qty & Price */}
      <div className="mt-6 flex basis-2/5 items-center justify-between md:mt-0 md:pb-6 md:pt-8">
        {/* Quantity controls */}
        <div className="flex h-[50px] w-44 items-center justify-between rounded bg-gray-100">
          <div className="h-full w-12 bg-gray-300"></div>
          <div className="h-full w-16 bg-gray-200"></div>
          <div className="h-full w-12 bg-gray-300"></div>
        </div>

        {/* Price */}
        <div className="h-6 w-20 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};
