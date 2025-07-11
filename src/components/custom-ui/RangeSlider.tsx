'use client';
import React, { FC } from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';
import * as SliderPrimitive from '@radix-ui/react-slider';

type RangeSliderProps = SliderPrimitive.SliderProps;

const RangeSlider: FC<RangeSliderProps> = ({ min = 0, max = 5, step = 1, ...restProps }) => {
  const values = Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, index) => min + index * step);

  return (
    <div className="w-full">
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        {...restProps}
        aria-label="value"
        className="relative flex h-5 w-full touch-none items-center"
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-gray-200 dark:bg-gray-800">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-current dark:bg-white" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            'block size-4 rounded-full bg-current',
            'focus:outline-hidden focus-visible:ring-3 focus-visible:ring-current focus-visible:ring-opacity-75'
          )}
        />
        <SliderPrimitive.Thumb
          className={cn(
            'block size-4 rounded-full bg-current',
            'focus:outline-hidden focus-visible:ring-3 focus-visible:ring-current focus-visible:ring-opacity-75'
          )}
        />
      </SliderPrimitive.Root>
      <div className="mt-2 flex w-full justify-between">
        {values.map(value => (
          <span key={value} className="min-w-4 text-center text-xs text-gray-500">
            {value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RangeSlider;
