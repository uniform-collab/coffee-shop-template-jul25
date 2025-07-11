import { FC } from 'react';
import {
  AccordionItem as CSKAccordionItem,
  AccordionItemProps as CSKAccordionItemProps,
} from '@uniformdev/csk-components/components/canvas';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';
import { cn, resolveViewPort } from '@uniformdev/csk-components/utils/styling';

type AccordionItemProps = CSKAccordionItemProps & {
  border?: string | ViewPort<string>;
};

const AccordionItem: FC<AccordionItemProps> = ({ border, ...props }) => (
  <CSKAccordionItem
    className={cn({
      [resolveViewPort(border, '{value}')]: border,
    })}
    {...props}
  />
);

export default AccordionItem;
