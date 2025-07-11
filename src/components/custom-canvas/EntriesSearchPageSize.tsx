'use client';
import { FC, useEffect, useState } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import Select from '@/components/custom-ui/Select';
import { useEntriesSearchContext } from '@/providers/EntriesSearchContextProvider';
type EntriesSearchPageSizeProps = ComponentProps;

const EntriesSearchPageSize: FC<EntriesSearchPageSizeProps> = () => {
  const { pageSize, setPageSize, pageSizes, isLoading } = useEntriesSearchContext();
  const [localPageSize, setLocalPageSize] = useState(pageSize);

  useEffect(() => {
    if (pageSize !== localPageSize && !isLoading) {
      setLocalPageSize(pageSize);
    }
  }, [pageSize, localPageSize, isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isLoading) return;
    const value = e.target.value;
    setLocalPageSize(Number(value));
    setPageSize(Number(value));
  };

  return (
    <Select className="min-w-[100px]" value={localPageSize} onChange={handleChange}>
      {pageSizes.map(pageSize => (
        <option key={pageSize.size} value={pageSize.size}>
          {pageSize.size}
        </option>
      ))}
    </Select>
  );
};

export default EntriesSearchPageSize;
