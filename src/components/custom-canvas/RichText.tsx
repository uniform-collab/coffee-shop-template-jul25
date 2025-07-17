import { FC } from 'react';
import { RichTextProps as CSKRichTextProps } from '../canvas/RichText';
import { RichText as CSKRichText } from '../canvas/RichText/rich-text';

const RichText: FC<CSKRichTextProps> = props => (
  <CSKRichText className="w-full [&>table]:ml-2 [&>table]:text-base [&_td>p]:!m-0 [&_td>p]:p-2" {...props} />
);

export default RichText;
