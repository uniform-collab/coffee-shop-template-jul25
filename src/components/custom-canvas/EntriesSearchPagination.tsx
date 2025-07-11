'use client';

import { FC, SVGProps, useCallback, useEffect, useMemo, useState } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { DOTS, usePagination } from '@/hooks/usePagination';
import { useEntriesSearchContext } from '@/providers/EntriesSearchContextProvider';

type EntriesSearchPaginationParameters = {
  siblingCount: number;
};
type EntriesSearchPaginationProps = ComponentProps<EntriesSearchPaginationParameters>;

const itemClasses = 'text-lg hover:scale-125 transition-transform disabled:pointer-events-none sm:mx-1 block';

const IconArrow: FC<SVGProps<SVGSVGElement>> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const EntriesSearchPagination: FC<EntriesSearchPaginationProps> = ({ siblingCount }) => {
  const { entries, setPage, isLoading } = useEntriesSearchContext();
  const { page, perPage, total: totalCount } = entries;
  const [localPage, setLocalPage] = useState(page);
  const pagination = usePagination({ currentPage: localPage, totalCount, perPage, siblingCount });
  const lastPage = useMemo(() => Number(pagination?.[pagination.length - 1]) || 0, [pagination]);

  useEffect(() => {
    if (page !== localPage && !isLoading) {
      setLocalPage(page);
    }
  }, [page, localPage, isLoading]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (isLoading) return;
      setLocalPage(newPage);
      setPage(newPage);
    },
    [isLoading, setPage]
  );

  const onPrevious = useCallback(() => {
    if (localPage > 0) {
      handlePageChange(localPage - 1);
    }
  }, [localPage, handlePageChange]);

  const onNext = useCallback(() => {
    if (localPage < lastPage) {
      handlePageChange(localPage + 1);
    }
  }, [localPage, lastPage, handlePageChange]);

  const onPageChange = useCallback(
    (pageNumber: number) => {
      handlePageChange(pageNumber);
    },
    [handlePageChange]
  );

  if (!pagination || pagination.length < 2) return null;

  return (
    <nav
      className="mx-auto flex w-full items-center justify-between gap-x-7 sm:my-10 sm:w-max sm:justify-center"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        className={cn(itemClasses, 'group')}
        disabled={localPage === 0 || isLoading}
        onKeyUp={onPrevious}
        onClick={onPrevious}
        aria-label="Go to previous page"
      >
        <IconArrow
          className="rotate-180 opacity-70 group-hover:opacity-100 group-disabled:opacity-50"
          aria-hidden="true"
        />
      </button>
      {pagination.map(pageNumber =>
        pageNumber === DOTS ? (
          <span key="dots" className={cn(itemClasses, 'pointer-events-none !hidden sm:!block')} aria-hidden="true">
            &#8230;
          </span>
        ) : (
          <button
            key={`page-${pageNumber}`}
            className={cn('!hidden hover:text-grey-700 sm:!block', itemClasses, {
              'pointer-events-none font-bold text-grey-700': pageNumber === localPage + 1,
            })}
            disabled={isLoading}
            onKeyUp={() => onPageChange(Number(pageNumber) - 1)}
            onClick={() => onPageChange(Number(pageNumber) - 1)}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={pageNumber === localPage + 1 ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        )
      )}
      <span className="flex items-center gap-x-6 text-lg font-bold sm:hidden" aria-hidden="true">
        <span>{localPage}</span>
        <span className="font-normal">of</span>
        <span>{lastPage}</span>
      </span>
      <button
        className={cn(itemClasses, 'group')}
        disabled={localPage === lastPage || isLoading}
        onKeyUp={onNext}
        onClick={onNext}
        aria-label="Go to next page"
      >
        <IconArrow className="opacity-70 group-hover:opacity-100 group-disabled:opacity-50" aria-hidden="true" />
      </button>
    </nav>
  );
};

export default EntriesSearchPagination;
