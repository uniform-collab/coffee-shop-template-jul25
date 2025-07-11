'use client';
import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useEntriesSearchContext } from '@/providers/EntriesSearchContextProvider';

type EntriesSearchTotalAmountParameters = {
  textTemplate: string;
  textColor?: string;
};
// You can use {page} {perPage} {totalItems} {totalPages} variables in the text, they will be replaced by values
type PossibleTemplateVariables = 'page' | 'perPage' | 'totalItems' | 'totalPages';

type EntriesSearchTotalAmountProps = ComponentProps<EntriesSearchTotalAmountParameters>;

const EntriesSearchTotalAmount: FC<EntriesSearchTotalAmountProps> = ({ textTemplate, textColor }) => {
  const { entries } = useEntriesSearchContext();
  const { total, page, perPage, totalPages } = entries || {};

  if (!total) {
    return null;
  }

  const templateVariables = {
    page,
    perPage,
    totalItems: total,
    totalPages,
  };

  const template = textTemplate.replace(/{(\w+)}/g, (match, p1) => {
    return String(templateVariables[p1 as PossibleTemplateVariables] || match);
  });

  return <div className={cn('text-sm', textColor)}>{template}</div>;
};

export default EntriesSearchTotalAmount;
