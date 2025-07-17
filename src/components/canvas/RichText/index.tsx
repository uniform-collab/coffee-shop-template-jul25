import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { RichTextNode } from '@uniformdev/richtext';
import { RichText } from './rich-text';

export type RichTextAdditionalProps = {
  className?: string;
};

export type RichTextParameters = {
  text?: RichTextNode;
  color?: string;
  font?: string;
  lineCountRestrictions: string;
  imagePositioning: 'float-left' | 'float-right';
};

export type RichTextProps = ComponentProps<RichTextParameters & RichTextAdditionalProps>;

export default RichText;
