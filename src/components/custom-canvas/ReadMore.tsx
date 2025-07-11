'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { Button, ButtonVariant } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';

export type ReadMoreParameters = {
  readMoreLabel?: string;
  readLessLabel?: string;
  maxHeight?: string;
  textColor?: string;
  colorFrom?: string;
  colorTo?: string;
};
enum SectionSlots {
  Content = 'content',
}

type ReadMoreProps = ComponentProps<ReadMoreParameters, SectionSlots>;

const ReadMore: FC<ReadMoreProps> = ({
  readLessLabel,
  readMoreLabel,
  component,
  context,
  slots,
  textColor,
  maxHeight: maxHeightProp = '150',
  colorFrom,
  colorTo,
}) => {
  const maxHeight = parseInt(maxHeightProp);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef?.current?.scrollHeight && contentRef?.current?.scrollHeight > maxHeight) {
      setIsOverflowing(true);
    }
  }, [maxHeight]);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className={cn('transition-max-height overflow-hidden duration-300 ease-in-out', {
          'max-h-full': isExpanded,
        })}
        style={{
          position: 'relative',
          maxHeight: !isExpanded ? `${maxHeight}px` : 'none',
        }}
      >
        <UniformSlot data={component} context={context} slot={slots.content} />
      </div>

      {!isExpanded && isOverflowing && (
        <div
          className={cn('pointer-events-none absolute inset-x-0 bottom-5 h-20 bg-gradient-to-t', {
            [`from-${colorFrom}`]: colorFrom,
            [`to-${colorTo}`]: colorTo,
          })}
        />
      )}

      {isOverflowing && (
        <Button textColor={textColor} variant={ButtonVariant.Link} className="mt-4" onClick={toggleExpand}>
          {isExpanded ? readLessLabel : readMoreLabel}
        </Button>
      )}
    </div>
  );
};

export default ReadMore;
