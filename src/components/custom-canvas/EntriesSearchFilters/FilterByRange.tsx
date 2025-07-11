'use client';

import { FC, useState } from 'react';
import RangeSlider from '@/components/custom-ui/RangeSlider';
import { FilterByProps } from './EntriesSearchFilters';

const FilterByRange: FC<FilterByProps> = ({ fieldKey, values, selectedValues, onFilterChange }) => {
  const allValues = values.map(v => Number(v.value));
  const minPossible = Math.min(...allValues);
  const maxPossible = Math.max(...allValues);
  const step = (maxPossible - minPossible) / (allValues.length - 1);

  const [minValue, setMinValue] = useState(Number(selectedValues[0]) || minPossible);
  const [maxValue, setMaxValue] = useState(Number(selectedValues[1]) || maxPossible);

  const handleChange = ([min, max]: [number, number]) => {
    setMinValue(min);
    setMaxValue(max);
  };

  const handleCommit = () => {
    onFilterChange(fieldKey, [minValue.toString(), maxValue.toString()]);
  };

  return (
    <div className="w-full">
      <RangeSlider
        min={minPossible}
        max={maxPossible}
        step={step}
        minStepsBetweenThumbs={1}
        value={[minValue, maxValue]}
        onValueChange={handleChange}
        onValueCommit={handleCommit}
      />
    </div>
  );
};

export default FilterByRange;
