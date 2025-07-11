import { useCallback, ChangeEvent, FC, useState } from 'react';
import Checkbox from '@/components/custom-ui/Checkbox';
import { FilterByProps } from './EntriesSearchFilters';

const FilterBySelect: FC<FilterByProps> = ({ fieldKey, values, selectedValues, onFilterChange, facetValues, type }) => {
  const [localSelectedValues, setLocalSelectedValues] = useState(selectedValues);
  const handleFilterChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (localSelectedValues.includes(value)) {
        const newSelectedValues = localSelectedValues.filter(filter => filter !== value);
        setLocalSelectedValues(newSelectedValues);
        onFilterChange(fieldKey, newSelectedValues);
      } else {
        const newSelectedValues = type === 'multiSelect' ? [...localSelectedValues, value] : [value];
        setLocalSelectedValues(newSelectedValues);
        onFilterChange(fieldKey, newSelectedValues);
      }
    },
    [localSelectedValues, onFilterChange, fieldKey, type]
  );

  return (
    <div className="flex flex-col gap-y-2">
      {values.map(({ value, title }) => (
        <Checkbox
          key={value}
          label={
            <span className="flex items-center gap-x-2">
              <span>{title}</span>
              {facetValues[value] && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{facetValues[value]}</span>
              )}
            </span>
          }
          value={value}
          checked={localSelectedValues.includes(value)}
          onChange={handleFilterChange}
        />
      ))}
    </div>
  );
};

export default FilterBySelect;
