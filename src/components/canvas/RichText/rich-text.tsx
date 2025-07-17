/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name */

import { FC } from 'react';
import Image from 'next/image';

import { UniformRichText } from '@uniformdev/canvas-next-rsc/component';
import BaseText from '@/components/ui/Text';
import { cn } from '@/utils/styling';
import { RichTextProps } from '.';

function ImageRenderer({ node, imagePositioning }: { node: any; imagePositioning: 'float-left' | 'float-right' }) {
  const { title, url, width, height } = node.node.__asset?.fields || {};
  return (
    <Image
      className={cn('max-w-64', imagePositioning)}
      loading="lazy"
      src={url?.value}
      alt={title?.value}
      width={width?.value}
      height={height?.value}
    />
  );
}

function resolveRichTextRenderer(node: any, imagePositioning: 'float-left' | 'float-right') {
  if (node.type === 'asset') {
    return (node: any) => <ImageRenderer node={node} imagePositioning={imagePositioning} />;
  }
  return undefined;
}

export const RichText: FC<RichTextProps> = ({
  color,
  lineCountRestrictions,
  font,
  component,
  className,
  imagePositioning,
}) => (
  <BaseText lineCountRestrictions={lineCountRestrictions} color={color} font={font}>
    <UniformRichText
      className={cn('prose max-w-full marker:text-current [&_*:not(pre)]:text-current', className)}
      parameterId="text"
      component={component}
      placeholder="Rich text content goes here..."
      resolveRichTextRenderer={node => resolveRichTextRenderer(node, imagePositioning)}
    />
  </BaseText>
);
